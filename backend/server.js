require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

// CORS_ORIGIN puede ser una lista separada por comas (ej: la URL de Vercel)
const origins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : "*";

app.use(cors({ origin: origins }));
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, mensaje: "API Catálogo de Ropa" }));
app.use("/api/products", require("./routes/products"));

// Manejo de errores
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const mensajes = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: mensajes.join(". ") });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ error: "ID inválido" });
  }
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

if (!process.env.MONGODB_URI) {
  console.error("Falta la variable MONGODB_URI (ver .env.example)");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("No se pudo conectar a MongoDB:", err.message);
    process.exit(1);
  });
