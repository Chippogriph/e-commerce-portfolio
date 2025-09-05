// controllers/favoritesController.js
import { db } from "../db/connection.js"; // Din SQLite-anslutning

// GET /api/favorites
export function getFavorites(req, res) {
  try {
    if (req.session.userId) {
      // 🔹 Hämta från user_favorites-tabellen
      const query = `
        SELECT products.*
        FROM products
        JOIN userFavorites ON userFavorites.productId = products.id
        WHERE userFavorites.userId = ?`;
      const favoritesFull = db.prepare(query).all(req.session.userId);
      return res.json(favoritesFull);
    } else {
      // 🔹 Guest → hämta från session
      const favoriteIds = req.session.favorites || [];
      if (favoriteIds.length === 0) return res.json([]);
      const placeholders = favoriteIds.map(() => "?").join(",");
      const query = `SELECT * FROM products WHERE id IN (${placeholders})`;
      const favoritesFull = db.prepare(query).all(...favoriteIds);
      return res.json(favoritesFull);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
}

// POST /api/favorites
export function addFavorite(req, res) {
  const { productId } = req.body;
  try {
    console.log("Session user:", req.session.userId);
console.log("ProductId:", productId);

    if (req.session.userId) {
      // 🔹 Lägg till i user_favorites-tabellen
      db.prepare(
        "INSERT OR IGNORE INTO userFavorites (userId, productId) VALUES (?, ?)"
      ).run(req.session.userId, productId);
      return res.json({ success: true });
    } else {
      // 🔹 Guest → spara i session
      if (!req.session.favorites) req.session.favorites = [];
      if (!req.session.favorites.includes(productId)) {
        req.session.favorites.push(productId);
      }
      return res.json(req.session.favorites);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add favorite" });
  }
}

// DELETE /api/favorites/:id
export function removeFavorite(req, res) {
  const id = parseInt(req.params.id, 10);
  console.log(id)
  try {
    if (req.session.userId) {
      // 🔹 Radera från user_favorites-tabellen
      db.prepare(
        "DELETE FROM userFavorites WHERE userId = ? AND productId = ?"
      ).run(req.session.userId, id);
      return res.json({ success: true });
    } else {
      // 🔹 Guest → ta bort från session
      if (!req.session.favorites) req.session.favorites = [];
      req.session.favorites = req.session.favorites.filter((p) => p !== id);
      return res.json(req.session.favorites);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
}
