import { db } from "../db/connection.js";

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

    const result = statement.run(name, slug, imageUrl); // <--- Spara resultatet här!

    res.status(201).json({
      id: result.lastInsertRowid, // nu finns id
      name,
      slug,
      imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel vid tillägg av kategori" });
  }
};

export const removeCategory = (req, res) => {
  const { id } = req.params;

  const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(id);
  if (!category) {
    return res.status(404).json({ error: "Produkt inte hittad" });
  }

  db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  const updatedcategories = db.prepare("SELECT * FROM categories").all();
  res.json(updatedcategories);
};

function formatSlug(text) {
  return text
    .toLowerCase() // Gör om till små bokstäver
    .replace(/\s+/g, "-") // Ersätt mellanslag med bindestreck
    .replace(/å/g, "a") // Ersätt åäö med aao
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9-]/g, ""); // Ta bort allt utom bokstäver, siffror och bindestreck
}
