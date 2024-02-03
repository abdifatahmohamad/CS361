const taskService = require('../services/taskService');

// Welcome route for the root URL
const welcomeMessage = (req, res) => {
  res.json({ message: 'Welcome to the Task List API!' });
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await taskService.getTaskById(taskId);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addTask = async (req, res) => {
  try {
    const newTask = req.body;
    const addedTask = await taskService.addTask(newTask);
    res.json(addedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = req.body;

    const result = await taskService.updateTask(taskId, updatedTask);

    if (!result) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await taskService.deleteTask(taskId);

    if (!deletedTask) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.json(deletedTask);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  welcomeMessage,
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
