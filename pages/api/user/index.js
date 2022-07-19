// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { prismaClient } from "../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "GET") {
    const users = await prisma.user.findMany();
    users.forEach((ele) => delete ele.password);
    return res.send(users);
  } else if (req.method == "POST") {
    const { body } = req;
    console.log("test");
    console.log(body);

    hash(body.password, 10, async (err, hash) => {
      const newUser = await prisma.user.create({
        data: {
          username: body.username,
          password: hash,
        },
      });
      return res.status(201).send(newUser);
    });
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}

export default withAPIMiddleware(handler, true);
