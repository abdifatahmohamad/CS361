const fs = require('fs/promises');
const path = require('path');
const DATA_FILE = path.join(__dirname, '../../tasks.json');

const getAllTasks = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const tasks = JSON.parse(data);
    return tasks;
  } catch (error) {
    console.error('Error reading tasks file:', error);
    throw error;
  }
};

const getTaskById = async (taskId) => {
  const tasks = await getAllTasks();
  const task = tasks.find((t) => t.id === Number(taskId));
  return task;
};

const addTask = async (newTask) => {
  let tasks = await getAllTasks();

  // Find the maximum existing ID
  const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);

  // Assign a new ID for the new task as a number
  newTask.id = maxId + 1;

  // Add completedTime property with the current timestamp if the task is completed
  if (newTask.completed) {
    newTask.completedTime = new Date().toISOString();
  }

  // Create a new object with "id" as the first property
  const reorderedNewTask = { id: newTask.id, ...newTask };

  tasks.push(reorderedNewTask);

  await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
  return reorderedNewTask;
};


const updateTask = async (taskId, updatedTask) => {
  try {
    let tasks = await getAllTasks();
    taskId = Number(taskId);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

      // If the task is marked as completed, set the completedTime property
      if (updatedTask.completed) {
        tasks[taskIndex].completedTime = new Date().toISOString();
      }

      await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    let tasks = await getAllTasks();
    taskId = Number(taskId);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
      const deletedTask = tasks.splice(taskIndex, 1)[0];
      await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2));
      return deletedTask;
    } else {
      return null;
    }
  } catch (error) {
    // Handle any errors that may occur during the deletion process
    console.error('Error deleting task:', error.message);
    throw error; 
  }
};


module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
};
