import express from "express";
import Host from "./models/Host.js";
import auth from "./middleware/auth.js";
import profileRoutes from "./routes/profile.route.js";

const api = express();

// Middleware
api.use(express.json());

// Rutas públicas
api.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

// Rutas protegidas
api.use("/api", auth, profileRoutes);

//  Ruta de login removida porque no pertenece a mi  ticket

export default api;
