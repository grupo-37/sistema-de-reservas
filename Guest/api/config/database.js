import mongoose from "mongoose";

mongoose.connection.on("open", () => {
  console.log("MongoDB connection established successfully");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connection disconnected");
});

mongoose.connect(process.env.MONGO_URI);