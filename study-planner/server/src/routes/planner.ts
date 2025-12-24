import { Router } from 'express';
import PlannerController from '../controllers/plannerController';

const router = Router();
const plannerController = new PlannerController();

router.post('/tasks', plannerController.createTask);
router.get('/tasks', plannerController.getTasks);
router.put('/tasks/:id', plannerController.updateTask);
router.delete('/tasks/:id', plannerController.deleteTask);

export default router;