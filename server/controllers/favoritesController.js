// controllers/favoritesController.js
import supabase from "../config/supabase.js";

// GET /api/favorites
export async function getFavorites(req, res) {
  try {
    if (req.session.userId) {
      // 🔹 Hämta ids från userFavorites, sedan produkterna
      const { data: favRows, error: favError } = await supabase
        .from("userFavorites")
        .select("productId")
        .eq("userId", req.session.userId);

      if (favError) throw favError;

      const productIds = favRows.map((row) => row.productId);
      if (productIds.length === 0) return res.json([]);

      const { data: favoritesFull, error: productsError } = await supabase
        .from("products")
        .select("*")
        .in("id", productIds);

      if (productsError) throw productsError;

      return res.json(favoritesFull);
    } else {
      // 🔹 Guest → hämta från session
      const favoriteIds = req.session.favorites || [];
      if (favoriteIds.length === 0) return res.json([]);

      const { data: favoritesFull, error } = await supabase
        .from("products")
        .select("*")
        .in("id", favoriteIds);

      if (error) throw error;

      return res.json(favoritesFull);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
}

// POST /api/favorites
export async function addFavorite(req, res) {
  const { productId } = req.body;
  try {
    if (req.session.userId) {
      // 🔹 Lägg till i userFavorites-tabellen (kräver unik constraint på userId+productId
      // för att ignoreDuplicates ska fungera som "INSERT OR IGNORE")
      const { error } = await supabase
        .from("userFavorites")
        .upsert(
          { userId: req.session.userId, productId },
          { onConflict: "userId,productId", ignoreDuplicates: true }
        );

      if (error) throw error;
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
export async function removeFavorite(req, res) {
  const id = parseInt(req.params.id, 10);
  try {
    if (req.session.userId) {
      // 🔹 Radera från userFavorites-tabellen
      const { error } = await supabase
        .from("userFavorites")
        .delete()
        .eq("userId", req.session.userId)
        .eq("productId", id);

      if (error) throw error;
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
