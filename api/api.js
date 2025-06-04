import express from "express";

const api = express();

api.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

export default api;
