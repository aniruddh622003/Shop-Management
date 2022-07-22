import { Prisma, PrismaClient } from "@prisma/client";
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { prismaClient } from "../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;
  const { id } = req.query;
  if (req.method == "GET") {
    try {
      const vendor = await prisma.vendor.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      if (!vendor) {
        return res.status(404).json({ message: "Vendor Not Found" });
      }
      return res.status(200).send(vendor);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else if (req.method == "POST") {
    const { body } = req;
    const v = await prisma.vendor.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: body.name,
        address: body.address,
        contact: body.contact,
      },
    });
    return res.status(201).send(v);
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}
export default withAPIMiddleware(handler, true);
