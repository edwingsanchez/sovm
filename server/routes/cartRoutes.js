const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.get("/", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });
  res.json(cart);
});

router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });

  const index = cart.products.findIndex(p => p.product.toString() === productId);
  if (index > -1) cart.products[index].quantity += quantity;
  else cart.products.push({ product: productId, quantity });

  await cart.save();
  res.json(await cart.populate("products.product"));
});

router.post("/remove", protect, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  await cart.save();
  res.json(await cart.populate("products.product"));
});

module.exports = router;

//case sensitive