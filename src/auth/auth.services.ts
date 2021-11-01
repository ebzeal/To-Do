import { getRepository } from 'typeorm';
import { User } from '../models';
import passwordHelp from '../utils/passwordHelp';
import tokenHelp from '../utils/tokenHelp';
import { AuthReturnedInterface, CreateUserInterface, LoginUserInterface } from './types/auth.types';

export default class AuthService {
    private static async checkIfUserExists(email: string, userName?: string): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find({
            where: [{ userName }, { email }],
        });
    }

    static async createUser(inputBody: CreateUserInterface): Promise<AuthReturnedInterface> {
        try {
            const userRepository = getRepository(User);
            const { userName, fullName, email, password } = inputBody;

            const getUser = await this.checkIfUserExists(email, userName);

            if (getUser.length > 0) return { error: 'This user already exists' };

            const hashedPassword = await passwordHelp.hashPassword(password);
            const userDetails = { userName, fullName, email, password: hashedPassword };

            const user = new User();
            const newUser = await userRepository.save({
                ...user,
                ...userDetails,
            });

            const payload = {
                id: newUser.id,
                userName: newUser.userName,
                fullName: newUser.fullName,
                email: newUser.email,
            };

            const token = tokenHelp.sign(payload, '20d');

            return { token };
        } catch (error: any) {
            return { error: error.detail };
        }
    }

    static async loginUser(inputBody: LoginUserInterface): Promise<AuthReturnedInterface> {
        try {
            const { userNameOrEmail, password } = inputBody;
            const userRepository = getRepository(User);
            const getUser = await userRepository.find({
                where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
            });
            if (getUser.length === 0) return { error: 'This user does not exist' };

            const isValidPassword = passwordHelp.verifyPassword(password, getUser[0].password);

            if (!isValidPassword) {
                return { error: 'Your login information is not correct' };
            }

            const payload = {
                id: getUser[0].id,
                userName: getUser[0].userName,
                fullName: getUser[0].fullName,
                email: getUser[0].email,
            };

            const token = tokenHelp.sign(payload);
            return { token };
        } catch (error: any) {
            return { error: error.detail };
        }
    }
}
