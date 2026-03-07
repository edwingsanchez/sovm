const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) return res.status(400).json({ message: "Usuario ya existe" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = jwt.sign({ id: user._id }, "tu_clave_secreta_aqui", { expiresIn: "30d" });
  res.json({ _id: user._id, name: user.name, email: user.email, token });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user._id }, "tu_clave_secreta_aqui", { expiresIn: "30d" });
  res.json({ _id: user._id, name: user.name, email: user.email, token });
});

module.exports = router;