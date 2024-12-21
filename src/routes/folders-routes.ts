import { Router } from "express";

import { FoldersController } from "../controllers/folders-controllers";
import { authenticateToken } from "../middlewares/my";


export const foldersRoutes = Router();
const foldersController = new FoldersController();

foldersRoutes.get('/', foldersController.getFolders);
foldersRoutes.post('/', foldersController.createFolder);
foldersRoutes.put('/:id', foldersController.updateFolder);
foldersRoutes.delete('/:id', foldersController.deleteFolder);