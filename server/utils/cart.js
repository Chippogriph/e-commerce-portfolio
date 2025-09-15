import { db } from "../db/connection.js";
// Migrera gästcart till användarcart vid login
export const migrateGuestCart = (userId, sessionCart) => {
  if (!sessionCart || sessionCart.length === 0) return;

  sessionCart.forEach(item => {
    const existingProduct = db.prepare("SELECT * FROM cart WHERE slug = ? AND userId = ?").get(item.slug, userId);
    if (existingProduct) {
      db.prepare("UPDATE cart SET quantity = quantity + ? WHERE slug = ? AND userId = ?").run(item.quantity, item.slug, userId);
    } else {
      db.prepare("INSERT INTO cart (userId, slug, name, url, brand, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .run(userId, item.slug, item.name, item.url, item.brand, item.price, item.quantity);
    }
  });
};

