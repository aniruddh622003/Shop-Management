import { withAPIMiddleware } from "middleware/APIMiddleware";
import { prismaClient } from "utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "GET") {
    // Get All Products
    let products = await prisma.products.findMany({
      include: {
        vendor: true,
      },
    });
    products = products.map((ele) => ({
      ...ele,
      BuyPrice: Math.round(ele.BuyPrice * 100) / 100,
    }));
    return res.status(200).send(products);
  } else if (req.method == "POST") {
    // Add (Purchase) Products
    const { body } = req;
    console.log("products");
    console.log(typeof body.products);
    let purchaseIDs = [];

    if (typeof body.products[0] == "string" || !body.products[0]) {
      return res
        .status(400)
        .json({ message: "Expected Products to be an array." });
    }

    for (const ele of body.products) {
      let productID;
      const checkProduct = await prisma.products.findFirst({
        where: {
          name: ele.name,
          MRP: ele.mrp,
        },
      });
      if (!checkProduct) {
        const newProduct = await prisma.products.create({
          data: {
            name: ele.name,
            BuyPrice: ele.buyPrice,
            MRP: ele.mrp,
            Quantity: ele.quantity,
            vendor: {
              connect: {
                id: ele.vendorID,
              },
            },
          },
        });
        productID = newProduct.id;
      } else {
        let newQty = ele.quantity + checkProduct.Quantity;
        let newBuy =
          (ele.quantity * ele.buyPrice +
            checkProduct.Quantity * checkProduct.BuyPrice) /
          newQty;

        const newProduct = await prisma.products.update({
          where: {
            name_MRP: {
              name: ele.name,
              MRP: ele.mrp,
            },
          },
          data: {
            name: ele.name,
            BuyPrice: newBuy,
            MRP: ele.mrp,
            Quantity: newQty,
            vendor: {
              connect: {
                id: ele.vendorID,
              },
            },
          },
        });
        productID = newProduct.id;
      }
      console.log(productID);
      const newPurchaseItem = await prisma.purchaseItem.create({
        data: {
          productID: productID,
          vendorID: ele.vendorID,
          Quantity: ele.quantity,
          PurchasePrice: ele.buyPrice,
        },
      });
      purchaseIDs.push({ id: newPurchaseItem.id });
    }

    console.log(purchaseIDs);
    const newPurchase = await prisma.purchase.create({
      data: {
        purchaseItems: {
          connect: [...purchaseIDs],
        },
        purchasedByID: req.user.id,
        Note: body.note ? body.note : "",
      },
    });
    const totalAmount = body.products.reduce(
      (PartialSum, ele) => PartialSum + ele.buyPrice * ele.quantity,
      0
    );
    const newTransaction = await prisma.transactions.create({
      data: {
        Gain: false,
        ModeOfPayment: body.modeOfPayment,
        Amount: totalAmount,
        purchase: {
          connect: { id: newPurchase.id },
        },
      },
    });
    return res.status(200).json({
      message: `Products added successfully. Transaction ID: ${newTransaction.id}`,
    });
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}
export default withAPIMiddleware(handler, true);
