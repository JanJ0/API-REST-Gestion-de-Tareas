// src/middlewares/errorMiddleware.js
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Error interno del servidor",
  });
};

const notFound = (req, res, next) => {
  res.status(404);

  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);

  next(error);
};

module.exports = {
  errorHandler,
  notFound,
};