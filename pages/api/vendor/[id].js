import { Prisma, PrismaClient } from "@prisma/client";
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { prismaClient } from "../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;
  if (req.method == "GET") {
    const { id } = req.query;
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
  }
}
export default withAPIMiddleware(handler, true);
