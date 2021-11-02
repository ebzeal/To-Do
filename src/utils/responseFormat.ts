import { ResponseInterface } from './types/utils.types';

export default function resFormat(
    status: string,
    code: number,
    message: string,
    error?: unknown,
    payload?: unknown,
): ResponseInterface {
    return {
        status,
        data: {
            statusCode: code,
            message,
            error,
            payload,
        },
    };
}
