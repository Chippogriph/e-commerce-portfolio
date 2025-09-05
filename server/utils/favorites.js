import { db } from "../db/connection.js";

export function migrateGuestFavoritesToUser(session) {
  if (session.favorites?.length) {
    const stmt = db.prepare(
      "INSERT OR IGNORE INTO userFavorites (userId, productId) VALUES (?, ?)"
    );
    session.favorites.forEach((productId) => {
      stmt.run(session.userId, productId);
    });
    session.favorites = [];
  }
}