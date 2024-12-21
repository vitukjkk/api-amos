import { Router } from "express";

import { FoldersController } from "../controllers/folders-controllers";
import { authenticateToken } from "../middlewares/my";


export const foldersRoutes = Router();
const foldersController = new FoldersController();

foldersRoutes.get('/', authenticateToken, foldersController.getFolders);
foldersRoutes.post('/', authenticateToken, foldersController.createFolder);
foldersRoutes.put('/:id', authenticateToken, foldersController.updateFolder);
foldersRoutes.delete('/:id', authenticateToken, foldersController.deleteFolder);