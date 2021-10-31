import { Router, Request, Response } from 'express';
import { AuthController, TodoController } from '../controllers';
import { signUpSchema, handleValidationErrors, logInSchema } from '../auth/middlewares/validations';

const route = Router();

route.get('/', (req, res) => {
    res.status(200).json('Welcome to the To-Do List!');
});

route.get('/todos', TodoController.getTodos);
route.post('/auth/signup', signUpSchema, handleValidationErrors, async (req: Request, res: Response) => {
    const response = await AuthController.createUser(req.body);
    return res.send(response);
});

route.post('/auth/login', logInSchema, handleValidationErrors, async (req: Request, res: Response) => {
    const response = await AuthController.loginUser(req.body);
    return res.send(response);
});

export default route;
