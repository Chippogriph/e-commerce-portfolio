import { db } from "../db/connection.js";

export const addProduct = (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      sku,
      price,
      quantity,
      publishedDate,
      categoryId,
    } = req.body;
    if (!req.file) return res.status(400).json({ error: "Ingen bild skickad" });
    const slug = formatSlug(name);

    // Filen som laddades upp
    const imageUrl = "/images/products/" + req.file.filename;

    const statement = db.prepare(`
      INSERT INTO products (
        slug,
        name,
        description, 
        imageUrl, 
        brand, 
        sku, 
        price, 
        quantity, 
        publishedDate,
        categoryId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    statement.run(
      slug,
      name,
      description,
      imageUrl,
      brand,
      sku,
      price,
      quantity,
      publishedDate,
      categoryId
    );

    res.status(201).json({ message: "Produkt tillagd" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Något gick fel vid tillägg av produkt" });
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
