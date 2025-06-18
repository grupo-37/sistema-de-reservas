import http from "http";
import express from "express";
import dotenv from "dotenv";
import profileRoutes from "./Routes/profile.js";
import api from "./api.js";
import "./config/database.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
