import { Body, Delete, Example, Get, Patch, Path, Post, Query, Route, Security, Tags } from 'tsoa';
import { Todo } from './entities/todo';
import { AddTodoInterface, TodoStatusType, UpdateTodoInterface } from './types/todo.types';
import TodoService from './todo.services';
import { User } from '../models';
import { PayloadInterface } from '../utils/types/utils.types';

const { addTodo, getAllTodos, getTodo, updateTodo, deleteTodo } = TodoService;

@Route('todo')
@Tags('Todos')
export default class TodoController {
    @Get('/')
    static async getTodos(@Query() status?: TodoStatusType): Promise<Todo[] | string> {
        try {
            return await getAllTodos(status);
        } catch (error: any) {
            return error;
        }
    }

    @Get('/:id')
    static async getTodo(id: number): Promise<Todo> {
        try {
            return await getTodo(id);
        } catch (error: any) {
            return error;
        }
    }

    @Security('jwt', ['admin'])
    @Post('/')
    @Example<Todo>({
        name: 'Check Data',
        description: '',
        id: 22,
        owner: new User(),
        status: TodoStatusType['in-progress'],
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    static async addTodo(@Body() body: AddTodoInterface & { userInfo: PayloadInterface }): Promise<Todo | string> {
        return addTodo(body);
    }

    @Patch('/:id')
    static async updateTodos(
        @Path() id: string,
        @Body() body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<Todo | string> {
        try {
            return await updateTodo(Number(id), body);
        } catch (error: any) {
            return error;
        }
    }

    @Delete('/:id')
    static async deleteTodos(
        @Path() id: string,
        @Body() body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<Todo | string> {
        try {
            return await deleteTodo(Number(id), body);
        } catch (error: any) {
            return error;
        }
    }
}
