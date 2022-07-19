// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prismaClient } from "../../utils/prisma";

export default async function handler(req, res) {
  const prisma = prismaClient;

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
