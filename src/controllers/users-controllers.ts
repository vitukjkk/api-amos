import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const userSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    name: z.string().min(3).max(30),
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

    async getUserByUserName(req : Request, res : Response, next : NextFunction) {
        try {
            const { username } = req.params;
            const user = await prisma.user.findUnique({where: {username}});
            if(!user) throw new AppError('Usuário não encontrado!', 404);
            res.json(user);
        } catch(error) {
            next(error);
        }
    }

    async loginUser(req : Request, res : Response, next : NextFunction) {
        try {
            const { username, password } = req.body;
            const user = await prisma.user.findUnique({where: {username}});
            if(!user) throw new AppError('Usuário não encontrado!', 404);

            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword) throw new AppError('Senha inválida!', 401);

            
            const token = jwt.sign(
                { id: user.id, username: user.username, name: user.name, role: user.role },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );
            
            res.json({token});
        } catch(error) {
            next(error);
        }
    };

    async createUser(req : Request, res : Response, next : NextFunction) {
        try {

            // CRIAR TOKEN PRA AUTENTICAR

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

    async updateUser(req : Request, res : Response, next : NextFunction) {
        try {
            const { username } = req.params;
            const userParsed = userSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(userParsed.password, 10);

            const user = await prisma.user.update({
                where: {username},
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

    async deleteUser(req : Request, res : Response, next : NextFunction) {
        try {
            const { username } = req.params;
            const user = await prisma.user.delete({where: {username}});
            res.json(user);
        } catch(error) {
            next(error);
        }
    }
}