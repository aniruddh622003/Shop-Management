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
    console.log(body);

    const checkProduct = await prisma.products.findFirst({
      where: {
        name: body.name,
        MRP: body.mrp,
        vendorID: body.vendorID,
      },
    });

    if (!checkProduct) {
      const newProduct = await prisma.products.create({
        data: {
          name: body.name,
          BuyPrice: body.buyPrice,
          MRP: body.mrp,
          Quantity: body.quantity,
          vendorID: body.vendorID,
        },
      });
      return res.status(201).send(newProduct);
    } else {
      let newQty = body.quantity + checkProduct.Quantity;
      let newBuy =
        (body.quantity * body.buyPrice +
          checkProduct.Quantity * checkProduct.BuyPrice) /
        newQty;

      const newProduct = await prisma.products.update({
        where: {
          name_MRP_vendorID: {
            name: body.name,
            MRP: body.mrp,
            vendorID: body.vendorID,
          },
        },
        data: {
          name: body.name,
          BuyPrice: newBuy,
          MRP: body.mrp,
          Quantity: newQty,
          vendorID: body.vendorID,
        },
      });

      return res.status(200).send(newProduct);
    }
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}
export default withAPIMiddleware(handler, true);
