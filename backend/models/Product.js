const mongoose = require("mongoose");

const CATEGORIES = ["Sastreros", "Chombas", "Pantalones de vestir", "Camisas"];

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "El nombre es obligatorio"], trim: true },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria"],
      enum: { values: CATEGORIES, message: "Categoría inválida" },
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    description: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    stock: { type: Number, min: [0, "El stock no puede ser negativo"], default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
module.exports.CATEGORIES = CATEGORIES;
