const express = require("express");
const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middleware/auth");

const router = express.Router();

// Middleware for all routes to pass through authentication
router.use(auth);

// tasks Routes
router.get("/", getTasks);
router.post("/", addTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
