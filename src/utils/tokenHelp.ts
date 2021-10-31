import jwt, { JwtPayload } from 'jsonwebtoken';
import env from 'dotenv';
import { PayloadInterface } from './types/utils.types';

env.config();

const secret = process.env.JWT_SECRET || '';
/**
 *
 *
 * @class TokenHelp
 */
class TokenHelp {
    /**
     *
     * @description Encodes a passed token and returns a jwt token
     * @static
     * @param {*} payload
     * @param {string} [ttl='2h']
     * @returns {string} Jwt token
     * @memberof Tokenize
     */
    static sign(payload: PayloadInterface, ttl: string = '12h'): string {
        return jwt.sign(payload, secret, { expiresIn: ttl });
    }

    /**
     *
     * @description Verifies a passed token and returns a decoded payload
     * @static
     * @param {string} token
     * @returns {object} Payload
     * @memberof Tokenize
     */
    static verify(token: string): string | JwtPayload {
        return jwt.verify(token, secret);
    }
}

export default TokenHelp;
