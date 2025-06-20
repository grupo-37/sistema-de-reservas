// generar-token.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const payload = {
  id: "666b099ba67d7dc3e64e08df",
  email: "test@test.com",
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log("Token JWT:\n\nBearer " + token);
