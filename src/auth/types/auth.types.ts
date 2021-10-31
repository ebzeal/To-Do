export interface CreateUserInterface {
    userName: string;
    fullName?: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthReturnedInterface {
    token?: string;
    error?: string;
}

export interface LoginUserInterface {
    userNameOrEmail: string;
    password: string;
}
