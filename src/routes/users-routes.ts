import { Router } from "express";

import { UsersController } from "../controllers/users-controllers";

export const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.get('/', usersController.getUsers);
usersRoutes.get('/:username', usersController.getUserByUserName);
usersRoutes.post('/', usersController.createUser);
usersRoutes.put('/:username', usersController.updateUser);
usersRoutes.delete('/:username', usersController.deleteUser);