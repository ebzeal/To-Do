import { getRepository } from 'typeorm';
import { Todo } from '../models';
import { PayloadInterface } from '../utils/types/utils.types';
import { AddTodoInterface, UpdateTodoInterface, TodoStatusType } from './types/todo.types';

export default class TodoService {
    static async addTodo(inputBody: AddTodoInterface & { userInfo: PayloadInterface }): Promise<Todo> {
        try {
            const { name, description, dueDate } = inputBody;
            const filteredInput = dueDate ? { name, description, dueDate } : { name, description };
            const todoRepository = getRepository(Todo);
            const todo = new Todo();
            const newTodo = await todoRepository.save({
                ...todo,
                ...filteredInput,
                owner: { ...inputBody.userInfo },
            });
            return newTodo;
        } catch (error: any) {
            return error;
        }
    }

    static async getAllTodos(filterByStatus?: TodoStatusType): Promise<Todo[]> {
        try {
            const todoRepository = getRepository(Todo);
            const query = filterByStatus ? { where: { status: filterByStatus } } : null;
            const getTodos = await todoRepository.find({ ...query });
            return getTodos;
        } catch (error: any) {
            return error;
        }
    }

    static async getTodo(id: number): Promise<Todo> {
        try {
            const todoRepository = getRepository(Todo);
            const getTodo = await todoRepository.findOne(id);
            if (!getTodo) return 'this todo does not exist' as any;
            return getTodo;
        } catch (error: any) {
            return error;
        }
    }

    static async updateTodo(
        id: number,
        body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<Todo | string> {
        try {
            const todoRepository = getRepository(Todo);
            const getTodo = await todoRepository.findOne(id);
            if (!getTodo) return 'this todo does not exist';
            if (getTodo.owner.id !== body.userInfo.id) return ' You cannot edit this task as is not yours';
            return await todoRepository.save({
                ...getTodo,
                name: body.name,
                description: body.description,
                status: body.status,
                dueDate: body?.dueDate || getTodo.dueDate,
            });
        } catch (error: any) {
            return error;
        }
    }

    static async deleteTodo(
        id: number,
        body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<Todo | string> {
        try {
            const todoRepository = getRepository(Todo);
            const getTodo = await todoRepository.findOne(id);
            if (!getTodo) return 'this todo does not exist';
            if (getTodo.owner.id !== body.userInfo.id) return ' You cannot delete this task as is not yours';
            return await todoRepository.remove(getTodo);
        } catch (error: any) {
            return error;
        }
    }
}
