import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface ErrorInterface {
    name: string;
    message: string;
}

export interface PayloadInterface {
    userId: number;
    userName: string;
    fullName?: string;
    email: string;
}

export interface UserAuthInfoRequestInterface extends Request {
    user: string | JwtPayload;
}
