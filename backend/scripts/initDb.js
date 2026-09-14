import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const schema = fs.readFileSync(
    path.join(__dirname, "..", "db", "schema.sql"),
    "utf-8"
  );

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "canelon_bakery",
    multipleStatements: true,
  });

  console.log("Creando tablas...");
  await connection.query(schema);
  console.log("Tablas creadas");

  await connection.end();
}

main().catch((err) => {
  console.error("Error creando las tablas:", err.message);
  process.exit(1);
});
