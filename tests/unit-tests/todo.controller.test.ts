
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Todo, User } from '../../src/models';
import TodoController from '../../src/todos/todo.controller';
import TodoServices from '../../src/todos/todo.services';
import dbConfig from '../../src/config/database';
import { todo } from '../mocks/todo.mocks';

beforeAll(async () => {
   await createConnection(dbConfig);
   const todoRepository = getRepository(Todo);
   const userRepository = getRepository(User);
      await userRepository.query(`INSERT INTO "user" (email, "fullName", "userName", password)VALUES('olu@me.com','olu Sola','olu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6Im9sdUBtZS5jb20iLCJhY2Nlc3MiOiJBZG1pbiIsImlhdCI6MTU4MDI5OTY4NiwiZXhwIjoxNjQzMzcxNjg2fQ.DEvUL4rmTthxLqAkH4rIYAKEvJQ9CyLkabMrXogyBzg'),('bar@ney.com', 'Bar Ney', 'barney', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJFbWFpbCI6ImJhckBuZXkuY29tIiwiYWNjZXNzIjoiVXNlciIsImlhdCI6MTU4MDI5OTc5MCwiZXhwIjoxNjQzMzcxNzkwfQ.4hn40LrFiOt6Gmyoj1b8sbXuAYA-aICneob4jDJCVEQ')`);
      await todoRepository.query(`INSERT INTO todo(name, description, status, user_id)VALUES('Scrub Floors','A tiring chore', 'in-progress', 1),('Complete PR','Get the task and reviews sorted', 'in-progress', 1),('Call Grandma','Yeah, just do it', 'in-progress', 2),('Fill form','', 'in-progress', 2)`);

});

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
});
describe('TodoController', () => {
    describe('getTodos', () => {
        test('should return empty array', async () => {
            const todoRepository = getRepository(Todo);
            const spy2 = jest.spyOn(todoRepository, 'find').mockImplementation(async () => []);
            const todos = await TodoController.getTodos();
            expect(todos).toEqual([]);
            expect(spy2).toHaveBeenCalledTimes(0);
            spy2.mockRestore();
        });

        test('should return todo list', async () => {
            const todoRepository = getRepository(Todo);
            const spy2 = jest.spyOn(todoRepository, 'find').mockImplementation(async () => todo);
            const todos = await TodoController.getTodos();
            expect(todos).toEqual(todo);
            expect(spy2).toHaveBeenCalledWith({});
            expect(spy2).toHaveBeenCalledTimes(1);
            spy2.mockRestore();
        });
    });
});
