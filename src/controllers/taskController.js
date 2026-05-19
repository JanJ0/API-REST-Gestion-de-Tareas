// src/controllers/taskController.js
const Task = require("../models/Task");
const asyncHandler = require("../middlewares/asyncHandler");

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, due_date } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    due_date,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Tarea creada correctamente",
    task,
  });
});

const getTasks = asyncHandler(async (req, res) => {
  const { status, due_date } = req.query;

  const filters = {
    user: req.user._id,
  };

  if (status) {
    filters.status = status;
  }

  if (due_date) {
    const startDate = new Date(due_date);
    const endDate = new Date(due_date);

    endDate.setDate(endDate.getDate() + 1);

    filters.due_date = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  const tasks = await Task.find(filters).sort({ createdAt: -1 });

  res.status(200).json({
    message: "Tareas obtenidas correctamente",
    count: tasks.length,
    tasks,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Tarea no encontrada");
  }

  res.status(200).json({
    message: "Tarea obtenida correctamente",
    task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, due_date } = req.body;

  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Tarea no encontrada");
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (due_date !== undefined) task.due_date = due_date;

  const updatedTask = await task.save();

  res.status(200).json({
    message: "Tarea actualizada correctamente",
    task: updatedTask,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error("Tarea no encontrada");
  }

  await task.deleteOne();

  res.status(200).json({
    message: "Tarea eliminada correctamente",
  });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};