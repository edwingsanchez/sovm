const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware"); // Middleware que verifica JWT

router.post("/", protect, async (req, res) => {
  try {
    const { products, total } = req.body;
    const order = new Order({
      user: req.user._id,
      products,
      total
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("Error al crear orden:", err);
    res.status(500).json({ message: "Error al crear orden" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product");
    res.json(orders);
  } catch (err) {
    console.error("Error al obtener órdenes:", err);
    res.status(500).json({ message: "Error al obtener órdenes" });
  }
});

module.exports = router;