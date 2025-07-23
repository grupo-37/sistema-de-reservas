import jwt from "jsonwebtoken";
const { verify } = jwt;
import { keyToken } from "../config/constants.js";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "No token, acceso denegado.",
    });
  }

  try {
    const decoded = verify(token, keyToken);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

export default auth;
