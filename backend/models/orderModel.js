import db from "../config/db.js";

export const createOrder = async (product_id, customer_name, customer_phone, notes) => {
  const sql = "INSERT INTO orders (product_id, customer_name, customer_phone, notes, order_date, status) VALUES (?, ?, ?, ?, NOW(), 'Pending')";
  const [result] = await db.query(sql, [product_id, customer_name, customer_phone, notes]);
  return result;
};

export const getAllOrders = async () => {
  const sql = `
      SELECT orders.id, products.name AS product_name, orders.customer_name,
             orders.customer_phone, orders.notes, orders.order_date, orders.status
      FROM orders
      JOIN products ON orders.product_id = products.id
      ORDER BY orders.order_date DESC
    `;
  const [results] = await db.query(sql);
  return results;
};

export const updateOrderStatus = async (status, id) => {
  await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
  return { message: "Order status updated" };
};

export const removeOrder = async (id) => {
  await db.query("DELETE FROM orders WHERE id = ?", [id]);
  return { message: "Order deleted successfully" };
};