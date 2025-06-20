import express from "express";
import { registerHost } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register/host", registerHost);

export default authRoutes;
