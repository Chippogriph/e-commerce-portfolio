import { db } from "../db/connection.js";
import multer from "multer";
import path from "path";

export const getAllCategories = (req, res) => {
  try {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const getCategoryWithProducts = (req, res) => {
  const { slug } = req.params;

  try {
    const category = db
      .prepare("SELECT * FROM categories WHERE slug = ?")
      .get(slug);

    if (!category) {
      return res.status(404).json({ error: "Kategori hittades inte" });
    }

    const products = db
      .prepare(
        `SELECT products.*
         FROM products
         JOIN categories ON products.categoryId = categories.id
         WHERE categories.slug = ?`
      )
      .all(slug);

    res.json({ category, products });
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const addCategory = (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) return res.status(400).json({ error: "Ingen bild skickad" });

    const slug = formatSlug(name);
    const imageUrl = "/images/categories/" + req.file.filename;

    const statement = db.prepare(`
      INSERT INTO categories (name, slug, imageUrl)
      VALUES (?, ?, ?)
    `);

    statement.run(name, slug, imageUrl);

    res.status(201).json({ message: "Kategori tillagd", name, slug, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel vid tillägg av kategori" });
  }
};

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/categories"); // Spara i denna mapp
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const uploadCategoryImage = multer({ storage });

function formatSlug(text) {
  return text
    .toLowerCase() // Gör om till små bokstäver
    .replace(/\s+/g, "-") // Ersätt mellanslag med bindestreck
    .replace(/å/g, "a") // Ersätt åäö med aao
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9-]/g, ""); // Ta bort allt utom bokstäver, siffror och bindestreck
}
