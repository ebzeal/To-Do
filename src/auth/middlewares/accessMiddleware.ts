import { UserTokenRequestInterface } from './../../utils/types/utils.types';
import { NextFunction, Response } from 'express';
import TokenHelp from '../../utils/tokenHelp';

/**
 * @class AccessMiddleware
 * @description class contains function for implementing Authentication middleware
 */
class AccessMiddleware {
    /**
     * @static
     * @description a middleware function checking if a user is authenticated
     * @param {object} req HTTP request object
     * @param {object} res HTTP response object
     * @param {function} next next middleware function
     */
    static async authoriseUser(req: UserTokenRequestInterface, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.send({ error: 'You are not logged in.' });
            }
            const token = authorization.split(' ')[1];
            const decoded = TokenHelp.verify(token);

            if (decoded) {
                req.body.userInfo = decoded;
                return next();
            }
        } catch (error: any) {
            const { name } = error;
            if (name === 'TokenExpiredError' || name === 'JsonWebTokenError') {
                return { error: 'You need to log in again.' };
            }
            return { error: 'An error occured on the server' };
        }
    }
}

export default AccessMiddleware;
