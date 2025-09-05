// controllers/cartController.js
import { db } from "../db/connection.js";

// GET /api/cart
export function getCart(req, res) {
  try {
    if (req.session.userId) {
      // 🔹 Hämta från cart-tabellen för inloggad användare
      const query = `
        SELECT * 
        FROM cart 
        WHERE userId = ?`;
      const cartItems = db.prepare(query).all(req.session.userId);
      return res.json(cartItems);
    } else {
      // 🔹 Gäst → hämta från session
      const cart = req.session.cart || [];
      return res.json(cart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
}

// POST /api/cart
export function addToCart(req, res) {
  const { id, slug, name, url, brand, price } = req.body;

  if (!slug || !name || !price) {
    return res.status(400).json({ error: "Alla fält krävs" });
  }

  try {
    if (req.session.userId) {
      // 🔹 Lägg till i cart-tabellen
      const existing = db
        .prepare("SELECT * FROM cart WHERE userId = ? AND slug = ?")
        .get(req.session.userId, slug);

      if (existing) {
        db.prepare(
          "UPDATE cart SET quantity = quantity + 1 WHERE userId = ? AND slug = ?"
        ).run(req.session.userId, slug);
      } else {
        db.prepare(
          "INSERT INTO cart (userId, slug, name, url, brand, price, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).run(req.session.userId, slug, name, url, brand, price, 1);
      }

      const updatedCart = db
        .prepare("SELECT * FROM cart WHERE userId = ?")
        .all(req.session.userId);
      return res.json(updatedCart);
    } else {
      // 🔹 Gäst → spara i session
      if (!req.session.cart) req.session.cart = [];

      const existing = req.session.cart.find((item) => item.slug === slug);
      if (existing) {
        existing.quantity += 1;
      } else {
        req.session.cart.push({
          id,
          slug,
          name,
          url,
          brand,
          price,
          quantity: 1,
        });
      }

      return res.json(req.session.cart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
}

// PATCH /api/cart/:id (uppdatera quantity)
export function updateCart(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Antal måste vara minst 1" });
  }

  try {
    if (req.session.userId) {
      db.prepare(
        "UPDATE cart SET quantity = ? WHERE id = ? AND userId = ?"
      ).run(quantity, id, req.session.userId);

      const updatedCart = db
        .prepare("SELECT * FROM cart WHERE userId = ?")
        .all(req.session.userId);
      return res.json(updatedCart);
    } else {
      if (!req.session.cart) req.session.cart = [];
      req.session.cart = req.session.cart.map((item) =>
        item.slug === id ? { ...item, quantity } : item
      );
      return res.json(req.session.cart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update cart" });
  }
}

// DELETE /api/cart/:id
export function removeFromCart(req, res) {
  const { id } = req.params;

  try {
    if (req.session.userId) {
      db.prepare("DELETE FROM cart WHERE id = ? AND userId = ?").run(
        id,
        req.session.userId
      );

      const updatedCart = db
        .prepare("SELECT * FROM cart WHERE userId = ?")
        .all(req.session.userId);
      return res.json(updatedCart);
    } else {
      if (!req.session.cart) req.session.cart = [];
      req.session.cart = req.session.cart.filter(
        (item) => item.id !== parseInt(req.params.id)
      );

      return res.json(req.session.cart);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
}

export function checkout(req, res) {
  try {
    if (req.session.userId) {
      db.prepare("DELETE FROM cart WHERE userId = ?").run(req.session.userId);
    } else {
      req.session.cart = [];
    }
    res.json({ success: true, message: "Köp genomfört, varukorgen är nu tom." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to checkout" });
  }
}
