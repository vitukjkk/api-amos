import { Router } from "express";
import { ObjectivesController } from "../controllers/objectives-controllers";

import { authenticateToken } from "../middlewares/my";

const objectivesController = new ObjectivesController();

export const objectivesRoutes = Router();

objectivesRoutes.get('/', objectivesController.getObjectives);
objectivesRoutes.post('/', objectivesController.createObjective);
objectivesRoutes.put('/:id', objectivesController.updateObjective);
objectivesRoutes.delete('/:id', objectivesController.deleteObjective);