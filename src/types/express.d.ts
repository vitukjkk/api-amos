import { User, Objective } from '@prisma/client'; 

declare global {
    namespace Express {
        interface Request {
            user?: User;
            objective?: Objective;
        }
    }
}