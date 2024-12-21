import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import z from "zod";

const prisma = new PrismaClient();

const objectiveSchema = z.object({
    name: z.string().min(3).max(30),
    user: z.string().min(3).max(30),
    description: z.string().min(6),
    status: z.enum(['to-do', 'doing', 'done']),
    deadline: z.date(),
});

export class ObjectivesController {
    async getObjectives(req: Request, res: Response, next: NextFunction) {
        try {
            const objectives = await prisma.objective.findMany();
            res.json(objectives);
        } catch (error) {
            next(error);
        }
    };

    async createObjective(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, user, description, status, deadline } = objectiveSchema.parse(req.body);
            const objective = await prisma.objective.create({
                data: {
                    name,
                    userId: user,   
                    description,
                    status,
                    deadline,
                }
            });
            res.json(objective);
        } catch (error) {
            next(error);
        }
    }
}