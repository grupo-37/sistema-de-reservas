import Guest from "../models/Guest.js";
import Host from "../models/Host.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { keyToken } from "../config/constants.js";

export const registerUserGuest = async (req, res) => {
try {
    const newGuest = Guest(req.body);

    await newGuest.save();

    res.status(201).json({message: "usuario registrado correctamente"});
} catch (error) {
    if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
    } else {
      console.log(error);

      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};


export const registerHost = async (req, res) => {
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

const saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt) => {
  if (err) {
    console.error("Error generando el salt:", err);
    return;
  }

  console.log("Salt generado:", salt);

  
  const userPassword = "password";
  bcrypt.hash(userPassword, salt, (err, hash) => {
    if (err) {
      console.error("Error hasheando:", err);
      return;
    }
    console.log("Hash generado:", hash);
  });
});

const contraseñaDelUsuario = 'userPassword';
const contraseñaHashAlmacenada = 'hashed_password_from_database';

bcrypt.compare(contraseñaDelUsuario, contraseñaHashAlmacenada, (err, result) => {
    if (err) {

        console.error('Error en la comparacion de contraseña:', err);
        return;
    }

if (result) {
    
    console.log('Las contraseñas coinciden');
} else {

    console.log('las contraseñas no coinciden');
}
});

