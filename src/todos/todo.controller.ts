import { Body, Delete, Example, Get, Patch, Path, Post, Query, Route, Security, Tags } from 'tsoa';
import { AddTodoInterface, TodoStatusType, UpdateTodoInterface } from './types/todo.types';
import TodoService from './todo.services';
import { User } from '../models';
import { PayloadInterface, ResponseInterface } from '../utils/types/utils.types';

const { addTodo, getAllTodos, getTodo, updateTodo, deleteTodo } = TodoService;

@Route('todo')
@Tags('Todos')
export default class TodoController {
    @Get('/')
    static async getTodos(@Query() status?: TodoStatusType): Promise<ResponseInterface> {
        return getAllTodos(status);
    }

    @Get('/:id')
    static async getTodo(id: number): Promise<ResponseInterface> {
        return getTodo(id);
    }

    @Security('jwt', ['admin'])
    @Post('/')
    @Example<ResponseInterface>({
        status: 'success',
        data: {
            statusCode: 200,
            message: 'Login successful',
            payload: {
                name: 'Check Data',
                description: '',
                id: 22,
                owner: new User(),
                status: TodoStatusType['in-progress'],
                dueDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        },
    })
    static async addTodo(@Body() body: AddTodoInterface & { userInfo: PayloadInterface }): Promise<ResponseInterface> {
        return addTodo(body);
    }

    @Patch('/:id')
    static async updateTodos(
        @Path() id: string,
        @Body() body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<ResponseInterface> {
        return updateTodo(Number(id), body);
    }

    @Delete('/:id')
    static async deleteTodos(
        @Path() id: string,
        @Body() body: UpdateTodoInterface & { userInfo: PayloadInterface },
    ): Promise<ResponseInterface> {
        return deleteTodo(Number(id), body);
    }
}
