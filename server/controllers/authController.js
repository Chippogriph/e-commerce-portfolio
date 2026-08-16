import bcrypt from "bcrypt";
import supabase from "../config/supabase.js";
import { migrateGuestFavoritesToUser } from "../utils/favorites.js";
import { migrateGuestCart } from "../utils/cart.js";

// Logga in användare
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    req.session.userId = user.id;
    req.session.isAdmin = user.isAdmin === true || user.isAdmin === 1;
    if (!req.session.cart) req.session.cart = [];

    // OBS: dessa två funktioner måste också konverteras till Supabase-anrop
    // (de importeras från utils/favorites.js och utils/cart.js, som inte var med i uppladdningen)
    await migrateGuestFavoritesToUser(req.session);
    await migrateGuestCart(req.session.userId, req.session.cart);
    req.session.cart = [];

    res.json({ message: "Logged in", isAdmin: req.session.isAdmin });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// Logga ut användare
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}

// Skapa ny användare
export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Kontrollera om email redan finns
    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (lookupError) throw lookupError;
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Hasha lösenordet
    const passwordHash = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        username,
        email,
        password_hash: passwordHash,
        isAdmin: false,
      })
      .select("id, username, email")
      .single();

    if (insertError) throw insertError;

    // Returnera ny användare (utan lösenord)
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
}
