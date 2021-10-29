import { Get, Route } from 'tsoa';

interface GetToDO {
    message: string;
}

@Route('todos')
export default class TodoController {
    @Get('/')
    static async getTodos(): Promise<GetToDO> {
        try {
            return { message: 'all To dos' };
        } catch (error) {
            return { message: `${error}` };
        }
    }
}
