import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants";

const util = require("util");

export const JWTMiddleWare = async (req, res) => {
  const prisma = new PrismaClient();

  let token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    res.status(401).json({
      message: "Please Log In Again",
    });
    return { req, res, error: true };
  }

  try {
    const decoded = verify(token, JWT_SECRET);

    const currentUser = await prisma.user.findFirst({
      where: {
        id: decoded.id,
      },
    });
    if (!currentUser) {
      res.status(401).json({
        message: "User with this token does not exist!",
      });
      return { req, res, error: true };
    }
    req.user = currentUser;
    req.body = { test: "test123" };
    return { req, res, error: false };
  } catch (err) {
    res.status(401).json({
      message: "Wrong token supplied!",
      err: err.message,
    });
    return { req, res, error: true };
  }
};
