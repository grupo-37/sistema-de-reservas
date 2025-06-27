import Guest from "../models/Guest.js";
import Host from "../models/Host.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



import { keyToken } from "../config/constants.js";


export const registerUserGuest = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGuest = new Guest({
      ...rest,
      password: hashedPassword,
      role: "guest",
    });

    await newGuest.save();

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        _id: newGuest._id,
        firstName: newGuest.firstName,
        lastName: newGuest.lastName,
        email: newGuest.email,
        birthday: newGuest.birthday,
        phone: newGuest.phone,
        paymentMethod: newGuest.paymentMethod,
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      console.error("Error interno del servidor:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

const generaToken = (id) => {
    return jwt.sign({ id }, keyToken, { expiresIn: "30d" });
};


export const registerHost = async (req, res) =>{
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await User.findOne({ email: rest.email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const host = await Host.create({
      ...rest,
      password: hashedPassword,
      role: "Host",
    });

    if (host) {
      res.status(201).json({
        _id: host._id,
        firstName: host.firstName,
        lastName: host.lastName,
        email: host.email,
        birthday: host.birthday,
        phone: host.phone,
        address: host.address,
        rfc: host.rfc,
        role: host.role,
      });
    } else {
      res.status(400).json({ message: "Invalid host data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error: Error creating host" });
    console.error("Error creating host:", error);
  }
};


const generateToken = (id) => {
    return jwt.sign({ id }, keyToken, { expiresIn: "30d" });
};

export const login = async (req, res) => {
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
