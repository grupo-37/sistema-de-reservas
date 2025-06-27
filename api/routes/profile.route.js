import { Router } from "express";
import auth from "../middlewares/auth.js";
import { updateProfile } from "../controllers/profile.controller.js";

const router = Router();

router.put("/", auth, updateProfile);

export default router;
