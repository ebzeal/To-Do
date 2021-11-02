import { Body, Example, Post, Route, Tags } from 'tsoa';
import AuthService from './auth.services';
import { CreateUserInterface, LoginUserInterface } from './types/auth.types';
import { ResponseInterface } from '../utils/types/utils.types';

@Route('auth')
@Tags('Auth')
export default class AuthController {
    @Example<ResponseInterface>({
        status: 'success',
        data: {
            statusCode: 201,
            message: 'New user created',
            payload:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsInVzZXJOYW1lIjoiT2x1MTEiLCJmdWxsTmFtZSI6Ik9sdSBTb2xhIiwiZW1haWwiOiJvbHVzQG1lLmNvbSIsImlhdCI6MTYzNTg0NjY2MSwiZXhwIjoxNjM4NDM4NjYxfQ.N4g3lRt7Fc-0Tfm7-xm3018XeUMZ_hdR7wr2N3RD7sM',
        },
    })
    @Post('/signup')
    static async createUser(@Body() body: CreateUserInterface): Promise<ResponseInterface> {
        return AuthService.createUser(body);
    }

    @Example<ResponseInterface>({
        status: 'success',
        data: {
            statusCode: 200,
            message: 'Login successful',
            payload:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsInVzZXJOYW1lIjoiT2x1MTEiLCJmdWxsTmFtZSI6Ik9sdSBTb2xhIiwiZW1haWwiOiJvbHVzQG1lLmNvbSIsImlhdCI6MTYzNTg0NjY2MSwiZXhwIjoxNjM4NDM4NjYxfQ.N4g3lRt7Fc-0Tfm7-xm3018XeUMZ_hdR7wr2N3RD7sM',
        },
    })
    @Post('/login')
    static async loginUser(@Body() body: LoginUserInterface): Promise<ResponseInterface> {
        return AuthService.loginUser(body);
    }
}
