// src/middlewares/validationMiddleware.js
const mongoose = require("mongoose");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidStatus = (status) => {
  const validStatuses = ["pending", "in_progress", "done"];
  return validStatuses.includes(status);
};

const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const validateRegister = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("El email es obligatorio");
  } else if (!isValidEmail(email)) {
    errors.push("El formato del email no es válido");
  }

  if (!password) {
    errors.push("El password es obligatorio");
  } else if (password.length < 6) {
    errors.push("El password debe tener al menos 6 caracteres");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Errores de validación",
      errors,
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email) {
    errors.push("El email es obligatorio");
  }

  if (!password) {
    errors.push("El password es obligatorio");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors,
    });
  }

  next();
};

const validateCreateTask = (req, res, next) => {
  const { title, status, due_date } = req.body;

  const errors = [];

  if (!title || title.trim() === "") {
    errors.push("El título es obligatorio");
  }

  if (status && !isValidStatus(status)) {
    errors.push("El status debe ser pending, in_progress o done");
  }

  if (due_date && !isValidDate(due_date)) {
    errors.push("La fecha due_date no es válida");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors,
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const { title, status, due_date } = req.body;

  const errors = [];

  if (title !== undefined && title.trim() === "") {
    errors.push("El título no puede estar vacío");
  }

  if (status !== undefined && !isValidStatus(status)) {
    errors.push("El status debe ser pending, in_progress o done");
  }

  if (due_date !== undefined && due_date !== "" && !isValidDate(due_date)) {
    errors.push("La fecha due_date no es válida");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors,
    });
  }

  next();
};

const validateMongoId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "El ID proporcionado no es válido",
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateTask,
  validateUpdateTask,
  validateMongoId,
};