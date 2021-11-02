import { createConnection, getConnection, getRepository } from 'typeorm';
import { Todo } from '../../src/models';
import TodoController from '../../src/todos/todo.controller';
import TodoServices from '../../src/todos/todo.services';
import dbConfig from '../../src/config/database';
import { todo } from '../../src/todos/mocks/todo.mocks';

beforeAll(async () => {
    await createConnection(dbConfig);
});

afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
});
describe('TodoController', () => {
    describe('getTodos', () => {
        test('should return empty array', async () => {
            const todoRepository = getRepository(Todo);
            const spy = jest.spyOn(TodoServices, 'getAllTodos').mockResolvedValueOnce([]);
            jest.spyOn(todoRepository, 'find').mockImplementation(async () => []);
            const todos = await TodoController.getTodos();
            expect(todos).toEqual([]);
            expect(spy).toHaveBeenCalledTimes(0);
            spy.mockRestore();
        });

        test('should return todo list', async () => {
            const todoRepository = getRepository(Todo);
            const spy2 = jest.spyOn(todoRepository, 'find').mockImplementation(async () => todo);
            const todos = await TodoController.getTodos();
            expect(todos).toEqual(todo);
            expect(spy2).toHaveBeenCalledWith({});
            expect(spy2).toHaveBeenCalledTimes(2);
            spy2.mockRestore();
        });
    });
});
