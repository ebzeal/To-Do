import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
    res.status(200).json('Welcome to the To-Do List!');
});
