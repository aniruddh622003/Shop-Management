import { withAPIMiddleware } from "middleware/APIMiddleware";
import { prismaClient } from "utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "GET") {
    const products = await prisma.products.findMany({
      include: {
        vendor: true,
      },
    });
    return res.status(200).send(products);
  } else if (req.method == "POST") {
    const { body } = req;
    console.log("products");
    console.log(typeof body.products);
    let purchaseIDs = [];

    if (typeof body.products[0] == "string" || !body.products[0]) {
      return res
        .status(400)
        .json({ message: "Expected Products to be an array." });
    }

    await Promise.all(
      body.products.map(async (ele, idx) => {
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
      })
    );
    console.log(purchaseIDs);
    const newPurchase = await prisma.purchase.create({
      data: {
        purchaseItems: {
          connect: [...purchaseIDs],
        },
        purchasedByID: req.user.id,
        Note: body.note,
      },
    });
    return res.status(200).json({ message: "Products added successfully" });
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}
export default withAPIMiddleware(handler, true);
