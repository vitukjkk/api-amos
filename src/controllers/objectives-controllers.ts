import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import z from "zod";

const prisma = new PrismaClient();

const objectiveSchema = z.object({
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(30),
    description: z.string().min(6),
    status: z.enum(['to-do', 'doing', 'done']),
    deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export class ObjectivesController {
    async getObjectives(req: Request, res: Response, next: NextFunction) {
        try {
            const objectives = await prisma.objective.findMany({
                where: { userName: req.query.username as string }
            });
            res.json(objectives);
        } catch (error) {
            next(error);
        }
    };

    async createObjective(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, username, description, status, deadline } = objectiveSchema.parse(req.body);
            const objective = await prisma.objective.create({
                data: {
                    name,
                    userName: username,   
                    description,
                    status,
                }
            });
            res.json(objective);
        } catch (error) {
            next(error);
        }
    }

    async updateObjective(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name, description, status, deadline } = objectiveSchema.parse(req.body);
            const objective = await prisma.objective.update({
                where: { id: id },
                data: {
                    name,
                    description,
                    status,
                    deadline: new Date(deadline),
                }
            });
            res.json(objective);
        } catch (error) {
            next(error);
        }
    }

    async deleteObjective(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await prisma.objective.delete({
                where: { id: id }
            });
            res.json({ message: 'Objetivo deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}