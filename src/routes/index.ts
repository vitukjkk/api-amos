import { Router, request, response } from "express";
import { authenticateToken } from "../middlewares/my";

import { usersRoutes } from "./users-routes";
import { objectivesRoutes } from "./objectives-routes";
import { foldersRoutes } from "./folders-routes";
import { chatsRoutes } from "./chats-routes";

export const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/objectives', authenticateToken, objectivesRoutes);
routes.use('/folders', authenticateToken, foldersRoutes);
routes.use('/chats', authenticateToken, chatsRoutes);