import { Router } from "express";
import { randomUUID } from "crypto";
import { pool } from "../lib/db.js";

const router = Router();

router.get("/", async (req, res) => {
  const [orders] = await pool.query(
    "SELECT id, total, estado, cliente, creado_en FROM orders ORDER BY creado_en DESC"
  );

  const [items] = await pool.query(
    "SELECT order_id, product_id, nombre, precio, qty FROM order_items"
  );

  const withItems = orders.map((order) => ({
    ...order,
    items: items.filter((i) => i.order_id === order.id),
  }));

  res.json(withItems);
});

router.post("/", async (req, res) => {
  const { items, cliente } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El pedido no tiene productos." });
  }

  const total = items.reduce((sum, item) => sum + item.precio * item.qty, 0);
  const orderId = randomUUID();

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      "INSERT INTO orders (id, total, cliente) VALUES (?, ?, ?)",
      [orderId, total, cliente || null]
    );

    for (const item of items) {
      await connection.query(
        `INSERT INTO order_items (order_id, product_id, nombre, precio, qty)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.id, item.nombre, item.precio, item.qty]
      );
    }

    await connection.commit();

    res.status(201).json({
      id: orderId,
      total,
      estado: "recibido",
      cliente: cliente || null,
      items,
    });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "No se pudo guardar el pedido." });
  } finally {
    connection.release();
  }
});

export default router;