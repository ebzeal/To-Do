import bcrypt from 'bcryptjs';

/**
 * @class PasswordManager
 */
class PasswordHelp {
    /**
     * @description Helper method to hash passwords
     * @static
     * @param {string} password
     * @returns {string} A string representing the hashed password
     * @memberof passwordHelp
     */
    static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    /**
     * @description Helper method to decrypt hashed passwords
     * @param {string} password
     * @param {string} hashedPassword
     * @returns {string} The original password
     * @memberof passwordHelp
     */
    static verifyPassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }
}

export default PasswordHelp;
