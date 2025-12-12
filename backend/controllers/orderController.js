import { createOrder, getAllOrders, updateOrderStatus, removeOrder } from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { product_id, customer_name, customer_phone, notes } = req.body;
    const result = await createOrder(product_id, customer_name, customer_phone, notes);
    res.json({ message: "Order placed successfully", orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const result = await updateOrderStatus(status, id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeOrder(id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
