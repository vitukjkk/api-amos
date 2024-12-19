import { Router } from "express";

import { UsersController } from "../controllers/users-controllers";

export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.getUsers);
usersRoutes.post('/', usersController.createUser);