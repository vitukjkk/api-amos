import { Request, Response, NextFunction, Router } from "express";

import { UsersController } from "../controllers/users-controllers";
import { authenticateToken } from "../middlewares/my";

export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', authenticateToken, usersController.getUsers);
usersRoutes.get('/login', usersController.loginUser);
usersRoutes.get('/:username', authenticateToken, usersController.getUserByUserName);
usersRoutes.post('/', authenticateToken, usersController.createUser);
usersRoutes.put('/:username', authenticateToken, usersController.updateUser);
usersRoutes.delete('/:username', authenticateToken, usersController.deleteUser);