import { hash } from "bcrypt";
import { prismaClient } from "utils/prisma";

export default async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "POST") {
    const { body } = req;

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
