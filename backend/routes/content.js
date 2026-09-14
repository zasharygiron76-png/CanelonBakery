import { Router } from "express";
import { pool } from "../lib/db.js";

const router = Router();

router.get("/products", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, nombre, descripcion, precio, image FROM products"
  );
  // Renombramos descripcion
  const products = rows.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    desc: r.descripcion,
    precio: r.precio,
    image: r.image,
  }));
  res.json(products);
});

router.get("/faqs", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, pregunta, respuesta FROM faqs"
  );
  const faqs = rows.map((r) => ({ q: r.pregunta, a: r.respuesta }));
  res.json(faqs);
});

router.get("/valores", async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, nombre, descripcion FROM valores"
  );
  const valores = rows.map((r) => ({ nombre: r.nombre, desc: r.descripcion }));
  res.json(valores);
});

export default router;