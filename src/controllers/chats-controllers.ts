import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import z from "zod";
import { OpenAI } from 'openai';

const prisma = new PrismaClient();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatSchema = z.object({
    content: z.string().min(6).max(255),
    folderId: z.string().uuid(),
});

export class ChatsController {

    async getChats(req: Request, res: Response, next: NextFunction) {
        try {
            const chats = await prisma.chat.findMany();
            res.json(chats);
        } catch(error) {
            next(error);
        }
    };

    async getChatById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const chat = await prisma.chat.findUnique({where: {id}});
            res.json(chat);
        } catch(error) {
            next(error);
        }
    }

    async createChat(req : Request, res : Response, next : NextFunction) {
        try {

            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'user', content: 'oi gptinho! tudo bem?'}
                ]
            }); 

            console.log(response.choices[0].message.content);
            res.json(response);

            const chatParsed = chatSchema.parse(req.body);
            const chat = await prisma.chat.create({
                data: {
                    content: chatParsed.content,
                    folderId: chatParsed.folderId
                }
            });
            res.json(chat);
        } catch(error) {
            next(error);
        }

    }

    async updateChat(req : Request, res : Response, next : NextFunction) {
        try {
            const chatParsed = chatSchema.parse(req.body);
            const { id } = req.params;
            const chat = await prisma.chat.update({
                where: { id },
                data: {
                    content: chatParsed.content,
                    folderId: chatParsed.folderId
                }
            });
            res.json(chat);
        } catch(error) {
            next(error);
        }
    }

    async deleteChat(req : Request, res : Response, next : NextFunction) {
        try {
            const { id } = req.params;
            const chat = await prisma.chat.delete({
                where: { id }
            });
            res.json(chat);
        } catch(error) {
            next(error);
        }
    }
}