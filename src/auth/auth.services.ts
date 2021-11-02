import { getRepository } from 'typeorm';
import { User } from '../models';
import passwordHelp from '../utils/passwordHelp';
import tokenHelp from '../utils/tokenHelp';
import { CreateUserInterface, LoginUserInterface } from './types/auth.types';
import resFormat from '../utils/responseFormat';
import { ResponseInterface } from '../utils/types/utils.types';

export default class AuthService {
    private static async checkIfUserExists(email: string, userName?: string): Promise<User[]> {
        const userRepository = getRepository(User);
        return userRepository.find({
            where: [{ userName }, { email }],
        });
    }

    static async createUser(inputBody: CreateUserInterface): Promise<ResponseInterface> {
        try {
            const userRepository = getRepository(User);
            const { userName, fullName, email, password } = inputBody;

            const getUser = await this.checkIfUserExists(email, userName);

            if (getUser.length > 0) return resFormat('failure', 406, 'This user already exists');

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

            const token = tokenHelp.sign(payload);

            return resFormat('success', 201, 'New user created', null, token);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }

    static async loginUser(inputBody: LoginUserInterface): Promise<ResponseInterface> {
        try {
            const { userNameOrEmail, password } = inputBody;
            const userRepository = getRepository(User);
            const getUser = await userRepository.find({
                where: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
                select: ['password', 'id', 'userName', 'fullName', 'email'],
            });
            if (getUser.length === 0) return resFormat('failure', 400, 'This user does not exist');

            const isValidPassword = passwordHelp.verifyPassword(password, getUser[0].password);

            if (!isValidPassword) {
                return resFormat('failure', 404, 'Your login information is not correct');
            }

            const payload = {
                id: getUser[0].id,
                userName: getUser[0].userName,
                fullName: getUser[0].fullName,
                email: getUser[0].email,
            };

            const token = tokenHelp.sign(payload);
            return resFormat('success', 201, 'Login successful', null, token);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }
}
