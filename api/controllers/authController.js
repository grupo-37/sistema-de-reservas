import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { keyToken } from "../config/constants.js";

const generateToken = (id) => {
    return jwt.sign({ id }, keyToken, { expiresIn: "30d" });
};

export const authenticateUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // 1. Encontrar el usuario por email
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 2. Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // 3. Generar el token si todo es correcto
    const token = generateToken(user._id);
    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
    });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno del servidor" });
    }
};
