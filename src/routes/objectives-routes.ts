import { Router } from "express";
import { ObjectivesController } from "../controllers/objectives-controllers";

import { authenticateToken } from "../middlewares/my";

const objectivesController = new ObjectivesController();

export const objectivesRoutes = Router();

objectivesRoutes.get('/', authenticateToken, objectivesController.getObjectives);
objectivesRoutes.post('/', authenticateToken, objectivesController.createObjective);
objectivesRoutes.put('/:id', authenticateToken, objectivesController.updateObjective);
objectivesRoutes.delete('/:id', authenticateToken, objectivesController.deleteObjective);