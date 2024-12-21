import { Router } from "express";
import { ChatsController } from "../controllers/chats-controllers";

export const chatsRoutes = Router();
const chatsController = new ChatsController();

chatsRoutes.get('/', chatsController.getChats);
chatsRoutes.get('/:id', chatsController.getChatById);
chatsRoutes.post('/', chatsController.createChat);
chatsRoutes.put('/:id', chatsController.updateChat);
chatsRoutes.delete('/:id', chatsController.deleteChat);