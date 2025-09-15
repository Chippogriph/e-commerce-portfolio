// utils/orderUtils.js
import { db } from "../db/connection.js";

export function getCartItems(userId, session) {
  if (userId) {
    return db.prepare("SELECT * FROM cart WHERE userId = ?").all(userId);
  } else {
    return session.cart || [];
  }
}
export function createOrder(userId) {
  const insertOrder = db.prepare(
    "INSERT INTO orders (userId, total) VALUES (?, ?)"
  );
  const result = insertOrder.run(userId, 0);
  return result.lastInsertRowid;
}

export function addOrderItems(orderId, cartItems) {
  let total = 0;
  const insertOrderItem = db.prepare(
    "INSERT INTO orderItems (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)"
  );
  const updateProductStock = db.prepare(
    "UPDATE products SET quantity = quantity - ? WHERE id = ? AND quantity >= ?"
  );

  for (const item of cartItems) {
    const product = db
      .prepare("SELECT id, price FROM products WHERE slug = ?")
      .get(item.slug);
    if (!product) throw new Error(`Produkten ${item.name} finns inte`);

    insertOrderItem.run(orderId, product.id, item.quantity, product.price);
    total += product.price * item.quantity;

    const stockResult = updateProductStock.run(
      item.quantity,
      product.id,
      item.quantity
    );
    if (stockResult.changes === 0) {
      throw new Error(`Inte tillräckligt med lager för ${item.name}`);
    }
  }

  return total;
}

export function updateOrderTotal(orderId, total) {
  db.prepare("UPDATE orders SET total = ? WHERE id = ?").run(total, orderId);
}

export function clearCart(userId, session) {
  if (userId) {
    db.prepare("DELETE FROM cart WHERE userId = ?").run(userId);
  } else {
    session.cart = [];
  }
}
