
// controller for subtask operations

// to add subtask to a task
exports.addSubtask = async (req, res) => {
    const { taskId } = req.params;
    const { subject, lastDateToComplete, status } = req.body;
  
    const task = req.user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).send({ error: 'Task not found' });
    }
  
    const newSubtask = { subject, lastDateToComplete, status };
    task.subtasks.push(newSubtask);
  
    await req.user.save();
    res.status(201).json(newSubtask);
  };
  

// to get all subtasks of a task
  exports.getSubtasks = async (req, res) => {
    const { taskId } = req.params;
  
    const task = req.user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).send({ error: 'Task not found' });
    }
  
    const subtasks = task.subtasks.filter(subtask => !subtask.isDeleted);
    res.status(200).json(subtasks);
  };
  

// to update a subtask
  exports.updateSubtasks = async (req, res) => {
    const { taskId } = req.params;
    const subtasks = req.body;
  
    const task = req.user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).send({ error: 'Task not found' });
    }
  
    task.subtasks = task.subtasks.filter(subtask => subtask.isDeleted);
    subtasks.forEach(subtask => task.subtasks.push(subtask));
  
    await req.user.save();
    res.status(200).json(task.subtasks);
  };
  

// to delete a subtask
  exports.deleteSubtask = async (req, res) => {
    const { taskId, subtaskId } = req.params;
  
    const task = req.user.tasks.id(taskId);
    if (!task || task.isDeleted) {
      return res.status(404).send({ error: 'Task not found' });
    }
  
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask || subtask.isDeleted) {
      return res.status(404).send({ error: 'Subtask not found' });
    }
  
    subtask.isDeleted = true;
    await req.user.save();
    res.status(200).send("Subtask deleted successfully");
  };
  