import bcrypt from "bcrypt";
import { db } from "../db/connection.js";

// Logga in användare
export async function login(req, res) {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  req.session.userId = user.id;
  if (!req.session.cart) req.session.cart = [];

  migrateFavoritesToUser(user.id, req.session);

  res.json({ message: "Logged in" });
}

// Logga ut användare
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}

// Hämta sessioninfo
export function getSession(req, res) {
  res.json({
    userId: req.session.userId || null,
    cart: req.session.cart || [],
  });
}

// Skapa ny användare
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Kontrollera om email redan finns
  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  // Hasha lösenordet
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const stmt = db.prepare(
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)"
    );
    const info = stmt.run(username, email, passwordHash);

    // Returnera ny användare (utan lösenord)
    res.status(201).json({
      id: info.lastInsertRowid,
      username,
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
}

function migrateFavoritesToUser(userId, session) {
  if (!session.favorites || session.favorites.length === 0) return;

  const insert = db.prepare(
    "INSERT OR IGNORE INTO userFavorites (userId, productId) VALUES (?, ?)"
  );

  session.favorites.forEach((productId) => {
    insert.run(userId, productId);
  });

  // Rensa efter migrering
  session.favorites = [];
}
