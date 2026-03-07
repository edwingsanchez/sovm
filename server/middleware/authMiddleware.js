const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "tu_clave_secreta_aqui");
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ message: "No autorizado, token inválido" });
    }
  } else {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }
};

module.exports = { protect };