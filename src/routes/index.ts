import { Router } from 'express';
import { TodoController } from '../controllers';

const route = Router();

route.get('/', (req, res) => {
    res.status(200).json('Welcome to the To-Do List!');
});

route.get('/todos', TodoController.getTodos);

export default route;
