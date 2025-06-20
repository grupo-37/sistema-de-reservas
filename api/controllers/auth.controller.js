import Guest from "../models/Guest.js";

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
