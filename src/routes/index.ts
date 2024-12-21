import { Router, request, response } from "express";

import { usersRoutes } from "./users-routes";
import { objectivesRoutes } from "./objectives-routes";

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/objectives', objectivesRoutes);