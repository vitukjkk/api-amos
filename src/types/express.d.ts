import { User, Objective } from '@prisma/client'; 
import { Jwt } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: User;
            objective?: Objective;
            userInfo?: UserInfo;
        }

        interface UserInfo {
            id: string;
            username: string;
            name: string;
            role: string;
        }
    }
}