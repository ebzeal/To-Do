import { Body, Example, Post, Route, Tags } from 'tsoa';
import AuthService from './auth.services';
import { AuthReturnedInterface, CreateUserInterface, LoginUserInterface } from './types/auth.types';

@Route('auth')
@Tags('Auth')
export default class AuthController {
    @Example<AuthReturnedInterface>({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJOYW1lIjoiT2x1IiwiZnVsbE5hbWUiOiJPbHUgU29sYSIsImVtYWlsIjoib2xlQG1lLmNvbSIsImlhdCI6MTYzNTcwMzU5NywiZXhwIjoxNjM1NzQ2Nzk3fQ.OLq3KN-DpQXnB9ttNcu1i_HaMTNA115b7hwZTP277YM',
    })
    @Post('/signup')
    static async createUser(@Body() body: CreateUserInterface): Promise<AuthReturnedInterface> {
        return AuthService.createUser(body);
    }

    @Example<AuthReturnedInterface>({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJOYW1lIjoiT2x1IiwiZnVsbE5hbWUiOiJPbHUgU29sYSIsImVtYWlsIjoib2xlQG1lLmNvbSIsImlhdCI6MTYzNTcwMzU5NywiZXhwIjoxNjM1NzQ2Nzk3fQ.OLq3KN-DpQXnB9ttNcu1i_HaMTNA115b7hwZTP277YM',
    })
    @Post('/login')
    static async loginUser(@Body() body: LoginUserInterface): Promise<AuthReturnedInterface> {
        return AuthService.loginUser(body);
    }
}
