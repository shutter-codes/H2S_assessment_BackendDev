const User = require('../models/user');


// to get all tasks
exports.getTasks = async (req, res) => {
  const tasks = req.user.tasks
    .filter(task => !task.isDeleted)
    .map(task => ({
      ...task.toObject(),
      subtasks: task.subtasks.filter(subtask => !subtask.isDeleted)
    }));
  res.status(200).json(tasks);
};


// to add a task
exports.addTask = async (req, res) => {
  const { subject, lastDateToComplete, status } = req.body;

  const newTask = { subject, lastDateToComplete, status };
  req.user.tasks.push(newTask);

  await req.user.save();
  res.status(201).json(newTask);
};


// to get a task by id and update it
exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { subject, lastDateToComplete, status } = req.body;

  const task = req.user.tasks.id(taskId);
  if (!task || task.isDeleted) {
    return res.status(404).send({ error: 'Task not found' });
  }

  task.subject = subject;
  task.lastDateToComplete = lastDateToComplete;
  task.status = status;

  await req.user.save();
  res.status(200).json(task);
};


// to delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  const task = req.user.tasks.id(taskId);
  if (!task || task.isDeleted) {
    return res.status(404).send({ error: 'Task not found' });
  }

  task.isDeleted = true;
  await req.user.save();
  res.status(200).send("message: Task deleted successfully");
};

