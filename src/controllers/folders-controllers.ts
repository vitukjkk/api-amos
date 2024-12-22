import { Request, Response, NextFunction } from 'express';
import z from "zod";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const folderSchema = z.object({
    userId: z.string().uuid(),
    name: z.string().min(3).max(30),
    description: z.string().min(6).max(255)
});

export class FoldersController {
    async getFolders(req: Request, res: Response, next: NextFunction) {
        try {
            const folders = await prisma.chatFolder.findMany();
            res.json(folders);
        } catch (error) {
            next(error);
        }
    }

    async createFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const folderParsed = folderSchema.parse(req.body);        
            const folders = await prisma.chatFolder.create({
                data: {
                    userId: folderParsed.userId,
                    name: folderParsed.name,
                    description: folderParsed.description
                }
            });
            res.json(folders);
        } catch(error) {
            next(error);
        }
    };

    async updateFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const folderParsed = folderSchema.parse(req.body);        
            const { id } = req.params;
            const folders = await prisma.chatFolder.update({
                where: { id },
                data: {
                    name: folderParsed.name,
                    description: folderParsed.description
                }
            });''
            res.json(folders);
        } catch(error) {
            next(error);
        }
    };

    async deleteFolder(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const folders = await prisma.chatFolder.delete({
                where: { id }
            });
            res.json({message: 'Folder deleted successfully!'});
        } catch(error) {
            next(error);
        };
    };
}