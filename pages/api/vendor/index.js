// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { prismaClient } from "../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "GET") {
    const vendors = await prisma.vendor.findMany();
    return res.send(vendors);
  } else if (req.method == "POST") {
    const { body } = req;
    console.log("vendors");
    console.log(body);

    const newVendor = await prisma.vendor.create({
      data: {
        name: body.name,
        address: body.address,
        contact: body.contact,
      },
    });
    return res.status(201).send(newVendor);
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}

export default withAPIMiddleware(handler, true);
