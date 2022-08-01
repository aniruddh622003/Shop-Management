import { withAPIMiddleware } from "middleware/APIMiddleware";

const { prismaClient } = require("utils/prisma");

async function handler(req, res) {
  const prisma = prismaClient;
  if (req.method == "GET") {
    // Get All Products
    let expenses = await prisma.transactions.findMany({
      where: {
        Gain: false,
      },
      include: {
        purchase: {
          include: {
            PurchasedBy: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).send(expenses);
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}

export default withAPIMiddleware(handler, true);
