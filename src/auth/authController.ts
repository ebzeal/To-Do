import { Body, Post, Route, Tags } from 'tsoa';
import AuthService from './authServices';
import { AuthReturnedInterface, CreateUserInterface, LoginUserInterface } from './types/auth.types';

@Route('auth')
@Tags('Auth')
export default class AuthController {
    @Post('/signup')
    static async createUser(@Body() body: CreateUserInterface): Promise<AuthReturnedInterface> {
        return AuthService.createUser(body);
    }

    @Post('/login')
    static async loginUser(@Body() body: LoginUserInterface): Promise<AuthReturnedInterface> {
        return AuthService.loginUser(body);
    }
}
