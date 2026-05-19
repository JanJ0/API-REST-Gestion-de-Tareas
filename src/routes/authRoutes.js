// src/routes/authRoutes.js
const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

const {
  validateRegister,
  validateLogin,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Acceso autorizado",
    user: req.user,
  });
});

module.exports = router;