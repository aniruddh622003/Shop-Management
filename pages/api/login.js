import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/constants";

export default async function login(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "POST") {
    const { body } = req;
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
      },
    });
    if (user) {
      compare(body.password, user.password, async (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!result) {
          res.status(401).json({ message: "Wrong Password" });
        }
        const jwt = sign({ id: user.id }, JWT_SECRET);
        return res.json({ authToken: jwt });
      });
    } else {
      return res.status(404).json({ message: "User not Found" });
    }
  } else {
    res.status(405).json({ message: "Wrong HTTP Method" });
  }
}
