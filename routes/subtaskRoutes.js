const express = require("express");
const {
  getSubtasks,
  updateSubtasks,
  deleteSubtask,
  addSubtask,
} = require("../controllers/subtaskController");

const auth = require("../middleware/auth");
const router = express.Router();

// Middleware for all routes to pass through authentication
router.use(auth);

// Subtasks Routes
router.get("/:taskId/subtasks", getSubtasks);
router.post("/:taskId/subtasks", addSubtask);
router.put("/:taskId/subtasks", updateSubtasks);
router.delete("/:taskId/subtasks/:subtaskId", deleteSubtask);

module.exports = router;
