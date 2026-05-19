// src/routes/taskRoutes.js
const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middlewares/authMiddleware");

const {
  validateCreateTask,
  validateUpdateTask,
  validateMongoId,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/", protect, validateCreateTask, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, validateMongoId, getTaskById);
router.put("/:id", protect, validateMongoId, validateUpdateTask, updateTask);
router.delete("/:id", protect, validateMongoId, deleteTask);

module.exports = router;