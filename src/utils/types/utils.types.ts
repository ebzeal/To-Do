import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface ErrorInterface {
    name: string;
    message: string;
}

export interface PayloadInterface {
    id: number;
    userName: string;
    fullName?: string;
    email: string;
}

export interface UserTokenRequestInterface extends Request {
    user?: string | JwtPayload;
}

export interface UserAuthInfoRequestInterface extends Request {
    user?: PayloadInterface;
}

interface ReturnedData {
    statusCode: number;
    message: string;
    error?: unknown;
    payload?: unknown;
}
export interface ResponseInterface {
    status: string;
    data: ReturnedData;
}
