// controllers/cartController.js
import supabase from "../config/supabase.js";
import {
  createOrder,
  getCartItems,
  addOrderItems,
  updateOrderTotal,
  clearCart,
} from "../utils/orders.js";

// GET /api/cart
export async function getCart(req, res) {
  try {
    if (req.session.userId) {
      // 🔹 Hämta från cart-tabellen för inloggad användare
      const { data: cartItems, error } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", req.session.userId);

      if (error) throw error;
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
export async function addToCart(req, res) {
  const { id, slug, name, url, brand, price } = req.body;

  if (!slug || !name || !price) {
    return res.status(400).json({ error: "Alla fält krävs" });
  }

  try {
    if (req.session.userId) {
      // 🔹 Lägg till i cart-tabellen
      const { data: existing, error: findError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", req.session.userId)
        .eq("slug", slug)
        .maybeSingle();

      if (findError) throw findError;

      if (existing) {
        const { error: updateError } = await supabase
          .from("cart")
          .update({ quantity: existing.quantity + 1 })
          .eq("userId", req.session.userId)
          .eq("slug", slug);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("cart").insert({
          userId: req.session.userId,
          slug,
          name,
          url,
          brand,
          price,
          quantity: 1,
        });
        if (insertError) throw insertError;
      }

      const { data: updatedCart, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", req.session.userId);
      if (fetchError) throw fetchError;

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
export async function updateCart(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: "Antal måste vara minst 1" });
  }

  try {
    if (req.session.userId) {
      const { error: updateError } = await supabase
        .from("cart")
        .update({ quantity })
        .eq("id", id)
        .eq("userId", req.session.userId);
      if (updateError) throw updateError;

      const { data: updatedCart, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", req.session.userId);
      if (fetchError) throw fetchError;

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
export async function removeFromCart(req, res) {
  const { id } = req.params;

  try {
    if (req.session.userId) {
      const { error: deleteError } = await supabase
        .from("cart")
        .delete()
        .eq("id", id)
        .eq("userId", req.session.userId);
      if (deleteError) throw deleteError;

      const { data: updatedCart, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", req.session.userId);
      if (fetchError) throw fetchError;

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

// 🔹 Huvudfunktion: checkout
export async function checkout(req, res) {
  try {
    const userId = req.session.userId || null;

    // 1. Hämta cart
    // OBS: getCartItems, createOrder, addOrderItems, updateOrderTotal, clearCart
    // kommer från utils/orders.js, som inte var med i uppladdningen och också
    // behöver konverteras till Supabase-anrop (och göras async om de inte redan är det).
    const cartItems = await getCartItems(userId, req.session);
    if (!cartItems.length) {
      return res.status(400).json({ error: "Varukorgen är tom" });
    }

    // 2. Skapa order
    const orderId = await createOrder(userId);

    // 3. Lägg till orderItems + uppdatera lager
    const total = await addOrderItems(orderId, cartItems);

    // 4. Uppdatera orderns totalsumma
    await updateOrderTotal(orderId, total);

    // 5. Töm cart
    await clearCart(userId, req.session);

    // 6. Returnera order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    if (orderError) throw orderError;

    // Kräver att en foreign key-relation finns mellan orderItems.productId och products.id
    // i Supabase, annars går det inte att hämta nested "products(...)" så här.
    const { data: rawOrderItems, error: itemsError } = await supabase
      .from("orderItems")
      .select("id, orderId, quantity, price, products(id, name, imageUrl)")
      .eq("orderId", orderId);
    if (itemsError) throw itemsError;

    const orderItems = rawOrderItems.map((item) => ({
      orderItemId: item.id,
      orderId: item.orderId,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price,
      productId: item.products.id,
      name: item.products.name,
      imageUrl: item.products.imageUrl,
    }));

    res.json({ success: true, order, orderItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to checkout" });
  }
}
