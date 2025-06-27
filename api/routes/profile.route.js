import { Router } from "express";
import auth from "../middleware/auth.js";
import { updateProfile } from "../controllers/profile.controller.js";

const router = Router();

router.put("/", auth, updateProfile);

export default router;
