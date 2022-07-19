import { withAPIMiddleware } from "../../../../middleware/APIMiddleware";
import { prismaClient } from "../../../../utils/prisma";

async function handler(req, res) {
  const prisma = prismaClient;
  const { id } = req.query;
  if (req.method == "POST") {
    const { body } = req;
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { enabled: JSON.parse(body.enabled) },
    });
    delete user.password;
    res.status(201).send(user);
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}

export default withAPIMiddleware(handler, true);
