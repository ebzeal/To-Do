import supertest from 'supertest';
import { createConnection, getConnection, getRepository } from 'typeorm';
import dbConfig from '../../src/config/database';
import { todos, todo } from '../mocks/todo.mocks';


import app from '../../src';


const request = supertest(app);
beforeAll(async () => {
    await createConnection(dbConfig);
});

afterEach(() => {
    jest.resetAllMocks();
});

afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
});
describe('get all todos', () => {
    it('should fetch all todos', async () => {
        const response = await request.get('/api/v1/todo');
        expect(response.body).toStrictEqual(todos);
    });

    it('should fetch a single todo', async () => {
      const response = await request.get('/api/v1/todo/31');
      expect(response.body).toStrictEqual(todos[0]);
  });
});
