// Carga productos de ejemplo: npm run seed
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  { name: "Saco sastrero azul marino", category: "Sastreros", price: 189000, stock: 6, description: "Saco de corte slim en lana fría, forro interior y dos botones." },
  { name: "Saco sastrero gris Oxford", category: "Sastreros", price: 195000, stock: 4, description: "Corte clásico, ideal para oficina y eventos formales." },
  { name: "Traje completo negro", category: "Sastreros", price: 320000, stock: 3, description: "Saco y pantalón a tono, tela con ligero stretch." },
  { name: "Chomba piqué blanca", category: "Chombas", price: 42000, stock: 15, description: "Algodón piqué, cuello clásico y tres botones." },
  { name: "Chomba piqué azul petróleo", category: "Chombas", price: 42000, stock: 12, description: "Ajuste regular, terminación premium." },
  { name: "Chomba lisa gris melange", category: "Chombas", price: 39000, stock: 10, description: "Suave al tacto, perfecta para combinar con saco." },
  { name: "Pantalón de vestir negro", category: "Pantalones de vestir", price: 78000, stock: 14, description: "Corte recto, tela gabardina con caída elegante." },
  { name: "Pantalón de vestir gris", category: "Pantalones de vestir", price: 78000, stock: 9, description: "Corte slim, cintura con pinzas." },
  { name: "Pantalón chino beige", category: "Pantalones de vestir", price: 69000, stock: 11, description: "Estilo smart casual, algodón con elastano." },
  { name: "Camisa blanca clásica", category: "Camisas", price: 54000, stock: 20, description: "Algodón popelín, cuello italiano, puño doble." },
  { name: "Camisa celeste rayada", category: "Camisas", price: 56000, stock: 13, description: "Rayas finas, corte slim." },
  { name: "Camisa de lino arena", category: "Camisas", price: 61000, stock: 8, description: "Liviana y fresca, ideal para verano." },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`Se cargaron ${products.length} productos`);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
