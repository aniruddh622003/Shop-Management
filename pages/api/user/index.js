// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withAPIMiddleware } from "../../../middleware/APIMiddleware";
import { prismaClient } from "../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;

  if (req.method == "GET") {
    const users = await prisma.user.findMany();
    users.forEach((ele) => delete ele.password);
    return res.send(users);
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}

export default withAPIMiddleware(handler, true);
