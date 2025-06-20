import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connection.on("open", () => {
  console.log("MongoDB connection established successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('La variable MONGO_URI no está definida en .env');
}

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));
