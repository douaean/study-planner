import { Request, Response } from 'express';
import Task from '../models/task';

class PlannerController {
    async createTask(req: Request, res: Response) {
        try {
            const task = new Task(req.body);
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTasks(req: Request, res: Response) {
        try {
            const tasks = await Task.find();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PlannerController();