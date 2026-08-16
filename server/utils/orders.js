// utils/orders.js
import supabase from "../config/supabase.js";

export async function getCartItems(userId, session) {
  if (userId) {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", userId);

    if (error) throw error;
    return data;
  } else {
    return session.cart || [];
  }
}

export async function createOrder(userId) {
  const { data, error } = await supabase
    .from("orders")
    .insert({ userId, total: 0 })
    .select("id")
    .single();

  if (error) throw error;
  return data.id;
}

export async function addOrderItems(orderId, cartItems) {
  let total = 0;

  for (const item of cartItems) {
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, price, quantity")
      .eq("slug", item.slug)
      .maybeSingle();

    if (productError) throw productError;
    if (!product) throw new Error(`Produkten ${item.name} finns inte`);

    const { error: insertError } = await supabase.from("orderItems").insert({
      orderId,
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    });

    if (insertError) throw insertError;

    total += product.price * item.quantity;

    const { data: stockRows, error: stockError } = await supabase
      .from("products")
      .update({ quantity: product.quantity - item.quantity })
      .eq("id", product.id)
      .gte("quantity", item.quantity)
      .select("id");

    if (stockError) throw stockError;
    if (!stockRows || stockRows.length === 0) {
      throw new Error(`Inte tillräckligt med lager för ${item.name}`);
    }
  }

  return total;
}

export async function updateOrderTotal(orderId, total) {
  const { error } = await supabase
    .from("orders")
    .update({ total })
    .eq("id", orderId);

  if (error) throw error;
}

export async function clearCart(userId, session) {
  if (userId) {
    const { error } = await supabase.from("cart").delete().eq("userId", userId);
    if (error) throw error;
  } else {
    session.cart = [];
  }
}