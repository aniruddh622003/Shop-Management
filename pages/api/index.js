// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "GET") {
    const users = await prisma.user.findMany();
    return res.send(users);
  } else if (req.method == "POST") {
    const { body } = req;
    console.log(body);
    const newUser = await prisma.user.create({
      data: body,
    });
    return res.status(201).send(newUser);
  }
}
