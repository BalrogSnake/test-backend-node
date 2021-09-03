import { query } from 'express';
import Task from '../models/Task'

export const createTask = async (req, res) => {
  const { id_user, name, state, description } = req.body;

  try {
    const newTask = new Task({
      id_user,
      name,
      state,
      description,
    });

    const taskSaved = await newTask.save();

    res.status(201).json(taskSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId);
  res.status(200).json(task);
};

export const getTasks = async (req, res) => { 
  const tasks = await Task.find();
  return res.json(tasks);
};

export const updateTaskById = async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.taskId,
    req.body,
    {
      new: true,
    }
  );
  res.status(204).json(updatedTask);
};

export const deleteTaskById = async (req, res) => {
  const { taskId } = req.params;

  await Task.findByIdAndDelete(taskId);

  // okey manito
  res.status(204).json();
};