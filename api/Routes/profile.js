import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) {
            return res.status(404).json({ error:"Usuario no encontrado " })
        }

        return res.status(200).json({ profile: user });
    } catch (error){
        console.error("Error en PROFILE", error);
        return res.status(500).json({ error: "Error de servidor" });
    }
});

export default router;
