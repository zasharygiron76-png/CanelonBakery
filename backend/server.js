import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import contentRoutes from "./routes/content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api", contentRoutes);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API de Canelon funcionando." });
});

app.listen(PORT, () => {
  console.log(`API de Canelon corriendo en http://localhost:${PORT}`);
});