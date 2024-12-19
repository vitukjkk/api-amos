import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

import z from "zod";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    name: z.string().min(3).max(30)
});

export class UsersController {
    async getUsers(req : Request, res : Response, next : NextFunction) {
        try {
            const users = await prisma.user.findMany();
            res.json(users);
        } catch(error) {
            next(error);
        }
    };

    async createUser(req : Request, res : Response, next : NextFunction) {
        try {
            const userParsed = userSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(userParsed.password, 10);

            const existingUser = await prisma.user.findUnique({where: {username: userParsed.username}});
            if(existingUser) throw new AppError('Usuário já existe!');

            const user = await prisma.user.create({
                data: {
                    username: userParsed.username,
                    password: hashedPassword,
                    name: userParsed.name
                }
            });

            res.json(user);
        
        } catch(error) {
            next(error);
        }
    };
}