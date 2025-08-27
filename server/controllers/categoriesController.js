import { db } from "../db/connection.js";

export const getAllCategories = (req, res) => {
  try {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Serverfel", details: error.message });
  }
};

export const addCategory = (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const slug = formatSlug(name);
    const statement = db.prepare(`
            INSERT INTO categories(
            name,
            imageUrl,
            slug
            ) VALUES (?, ?, ?)
             `);
  } catch (error) {
    res.status(500).json({ error: "Något gick fel vid tillägg av kategori" });
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


function formatSlug(text) {
  return text
    .toLowerCase() // Gör om till små bokstäver
    .replace(/\s+/g, "-") // Ersätt mellanslag med bindestreck
    .replace(/å/g, "a") // Ersätt åäö med aao
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9-]/g, ""); // Ta bort allt utom bokstäver, siffror och bindestreck
}
