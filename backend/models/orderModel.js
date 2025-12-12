import db from "../config/db.js";
export const createOrder = (product_id, customer_name, customer_phone, notes) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO orders (product_id, customer_name, customer_phone, notes, order_date, status) VALUES (?, ?, ?, ?, NOW(), 'Pending')";
    db.query(sql, [product_id, customer_name, customer_phone, notes], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

export const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT orders.id, products.name AS product_name, orders.customer_name,
             orders.customer_phone, orders.notes, orders.order_date, orders.status
      FROM orders
      JOIN products ON orders.product_id = products.id
      ORDER BY orders.order_date DESC
    `;
    db.query(sql, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

export const updateOrderStatus = (status, id) => {
  return new Promise((resolve, reject) => {
    db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err) => {
      if (err) reject(err);
      resolve({ message: "Order status updated" });
    });
  });
};

export const removeOrder = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM orders WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      resolve({ message: "Order deleted successfully" });
    });
  });
};
