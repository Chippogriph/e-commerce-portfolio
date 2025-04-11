import { db } from "../db/connection.js";

function formatSlug(text) {
    return text
      .toLowerCase() // Gör om till små bokstäver
      .replace(/\s+/g, '-') // Ersätt mellanslag med bindestreck
      .replace(/å/g, 'a') // Ersätt åäö med aao
      .replace(/ä/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9-]/g, ''); // Ta bort allt utom bokstäver, siffror och bindestreck
  }

export const addProduct = (req, res) => {
    try {
        const { name, description, url, brand, sku, price, quantity, publishedDate } = req.body;
        const slug = formatSlug(name)
        const statement = db.prepare(`
            INSERT INTO products (
                slug,
                name,
                description, 
                url, 
                brand, 
                sku, 
                price, 
                quantity, 
                publishedDate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        statement.run(slug, name, description, url, brand, sku, price, quantity, publishedDate);

        res.status(201).json({ message: "Produkt tillagd" });
    } catch (error) {
        res.status(500).json({ error: "Något gick fel vid tillägg av produkt" });
    }
};
