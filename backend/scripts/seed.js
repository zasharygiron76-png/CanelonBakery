import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../lib/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readJSON(filename) {
  const filePath = path.join(__dirname, "..", "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function main() {
  const products = readJSON("products.json");
  const faqs = readJSON("faqs.json");
  const valores = readJSON("valores.json");

  console.log("Sembrando productos...");
  for (const p of products) {
    await pool.query(
      `INSERT INTO products (id, nombre, descripcion, precio, image)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         nombre = VALUES(nombre),
         descripcion = VALUES(descripcion),
         precio = VALUES(precio),
         image = VALUES(image)`,
      [p.id, p.nombre, p.desc, p.precio, p.image]
    );
  }

  console.log("Sembrando FAQs...");
  await pool.query("DELETE FROM faqs");
  for (const f of faqs) {
    await pool.query(
      "INSERT INTO faqs (pregunta, respuesta) VALUES (?, ?)",
      [f.q, f.a]
    );
  }

  console.log("Sembrando valores...");
  await pool.query("DELETE FROM valores");
  for (const v of valores) {
    await pool.query(
      "INSERT INTO valores (nombre, descripcion) VALUES (?, ?)",
      [v.nombre, v.desc]
    );
  }

  console.log("Listo");
  await pool.end();
}

main().catch((err) => {
  console.error("Error sembrando datos:", err.message);
  process.exit(1);
});
