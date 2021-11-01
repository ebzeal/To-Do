export interface CreateUserInterface {
    userName: string;
    /**
     * @example "fullName is optional"
     */
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
    /**
     * @example "This could be either the userName or the email"
     */
    userNameOrEmail: string;
    password: string;
}
