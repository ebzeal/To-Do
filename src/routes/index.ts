import { TodoStatusType } from './../todos/types/todo.types';
import { Router, Request, Response } from 'express';
import { AuthController, TodoController } from '../controllers';
import {
    signUpSchema,
    handleValidationErrors,
    logInSchema,
    createTodoSchema,
    updateTodoSchema,
} from '../auth/middlewares/validations';
import AccessMiddleware from '../auth/middlewares/accessMiddleware';
import { UserAuthInfoRequestInterface } from '../utils/types/utils.types';

const { authoriseUser } = AccessMiddleware;

const route = Router();

route.get('/', (req, res) => {
    res.status(200).json('Welcome to the To-Do List!');
});

route.post('/auth/signup', signUpSchema, handleValidationErrors, async (req: Request, res: Response) => {
    const response = await AuthController.createUser(req.body);
    return res.send(response);
});

route.post('/auth/login', logInSchema, handleValidationErrors, async (req: Request, res: Response) => {
    const response = await AuthController.loginUser(req.body);
    return res.send(response);
});

route.get('/todo/', async (req: Request, res: Response) => {
    const getAllTodos = await TodoController.getTodos(req.query.status as TodoStatusType);
    return res.send(getAllTodos);
});

route.get('/todo/:id', async (req: Request, res: Response) => {
    const getTodo = await TodoController.getTodo(Number(req.params.id));
    return res.send(getTodo);
});

route.post(
    '/todo/',
    createTodoSchema,
    handleValidationErrors,
    authoriseUser,
    async (req: UserAuthInfoRequestInterface, res: Response) => {
        const response = await TodoController.addTodo(req.body);
        return res.send(response);
    },
);

route.patch(
    '/todo/:id',
    updateTodoSchema,
    handleValidationErrors,
    authoriseUser,
    async (req: UserAuthInfoRequestInterface, res: Response) => {
        const response = await TodoController.updateTodos(req.params.id, req.body);
        return res.send(response);
    },
);

route.delete('/todo/:id', authoriseUser, async (req: UserAuthInfoRequestInterface, res: Response) => {
    const response = await TodoController.deleteTodos(req.params.id, req.body);
    return res.send(response);
});

export default route;
