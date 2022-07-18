// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { JWTMiddleWare } from "../../../middleware/JWTMiddleware";

async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "GET") {
    const users = await prisma.user.findMany();
    return res.send(users);
  } else if (req.method == "POST") {
    const { body } = req;

    hash(body.password, 10, async (err, hash) => {
      console.log(body);
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

export default withAPIMiddleware(handler, JWTMiddleWare);
