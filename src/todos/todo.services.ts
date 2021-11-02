import { getRepository } from 'typeorm';
import { Todo } from '../models';
import { PayloadInterface } from '../utils/types/utils.types';
import { AddTodoInterface, UpdateTodoInterface, TodoStatusType } from './types/todo.types';
import resFormat from '../utils/responseFormat';
import { ResponseInterface } from '../utils/types/utils.types';

export default class TodoServices {
    private static async checkTodoItemById(id: number): Promise<Todo | undefined> {
        const todoRepository = getRepository(Todo);
        const getTodo = await todoRepository.findOne(id);
        return getTodo;
    }

    private static authoriseUser(getTodo: Todo, id: number): boolean {
        return Number(getTodo.owner.id) === id;
    }

    static async addTodo(inputBody: AddTodoInterface & { userInfo: PayloadInterface }): Promise<ResponseInterface> {
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
            return resFormat('success', 201, 'New To Do added', null, newTodo);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }

    static async getAllTodos(filterByStatus?: TodoStatusType): Promise<ResponseInterface> {
        try {
            const todoRepository = getRepository(Todo);
            const query = filterByStatus ? { where: { status: filterByStatus } } : null;
            const getTodos = await todoRepository.find({ ...query });
            const message = filterByStatus ? `All '${filterByStatus}' To Dos` : 'All To Dos';
            return resFormat('success', 200, message, null, getTodos);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }

    static async getTodo(id: number): Promise<ResponseInterface> {
        try {
            const getTodo = await TodoServices.checkTodoItemById(id);
            if (!getTodo) return resFormat('failure', 404, 'This To Do does not exist');
            return resFormat('success', 200, 'To Do found', null, getTodo);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }

    static async updateTodo(
        id: number,
        body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<ResponseInterface> {
        try {
            const todoRepository = getRepository(Todo);
            const getTodo = await TodoServices.checkTodoItemById(id);
            if (!getTodo) return resFormat('failure', 404, 'This To Do does not exist');
            const canUserEdit = TodoServices.authoriseUser(getTodo, body.userInfo.id);
            if (!canUserEdit) return resFormat('failure', 401, 'You cannot edit this item as it is not yours');
            const updateTodo = await todoRepository.save({
                ...getTodo,
                name: body.name,
                description: body.description,
                status: body.status,
                dueDate: body?.dueDate || getTodo.dueDate,
            });
            return resFormat('success', 200, 'To Do found', null, updateTodo);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }

    static async deleteTodo(
        id: number,
        body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<ResponseInterface> {
        try {
            const todoRepository = getRepository(Todo);
            const getTodo = await TodoServices.checkTodoItemById(id);
            if (!getTodo) return resFormat('failure', 404, 'This To Do does not exist');
            const canUserDelete = TodoServices.authoriseUser(getTodo, body.userInfo.id);
            if (!canUserDelete) return resFormat('failure', 401, 'You cannot delete this item as it is not yours');
            await todoRepository.remove(getTodo);
            return resFormat('success', 200, 'To Do deleted', null);
        } catch (error) {
            return resFormat('failure', 500, 'Please contact admin', null, error);
        }
    }
}
