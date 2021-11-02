import { User } from '../../models';
import { TodoStatusType } from './../types/todo.types';

const user = new User();
export const todos = [
    {
        id: 31,
        name: 'Tests and Info',
        description: 'Details and Tries',
        status: 'in-progress',
        dueDate: '2021-11-02',
        createdAt: '2021-11-01T06:01:02.487Z',
        updatedAt: '2021-11-01T06:01:02.487Z',
        deletedAt: null,
        owner: {
            id: 25,
            userName: 'Olu',
            fullName: 'Olu Sola',
            email: 'ole@me.com',
            password: '$2a$10$ZMD0vJGmAh5hWbQbmVViA.kKrj6/618TZEsvfR/R1KYwPR3dw33Ta',
            createdAt: '2021-10-30T23:30:48.859Z',
            updatedAt: '2021-10-30T23:30:48.859Z',
        },
    },
    {
        id: 32,
        name: 'New Ledger',
        description: 'New Data',
        status: 'in-progress',
        dueDate: '2021-11-02',
        createdAt: '2021-11-01T06:01:13.364Z',
        updatedAt: '2021-11-01T06:01:13.364Z',
        deletedAt: null,
        owner: {
            id: 25,
            userName: 'Olu',
            fullName: 'Olu Sola',
            email: 'ole@me.com',
            password: '$2a$10$ZMD0vJGmAh5hWbQbmVViA.kKrj6/618TZEsvfR/R1KYwPR3dw33Ta',
            createdAt: '2021-10-30T23:30:48.859Z',
            updatedAt: '2021-10-30T23:30:48.859Z',
        },
    },
    {
        id: 30,
        name: 'Check Data',
        description: 'Another description here',
        status: 'completed',
        dueDate: '2021-11-02',
        createdAt: '2021-11-01T06:00:43.058Z',
        updatedAt: '2021-11-01T07:56:54.530Z',
        deletedAt: null,
        owner: {
            id: 25,
            userName: 'Olu',
            fullName: 'Olu Sola',
            email: 'ole@me.com',
            password: '$2a$10$ZMD0vJGmAh5hWbQbmVViA.kKrj6/618TZEsvfR/R1KYwPR3dw33Ta',
            createdAt: '2021-10-30T23:30:48.859Z',
            updatedAt: '2021-10-30T23:30:48.859Z',
        },
    },
];

export const todo = [
    {
        id: 31,
        name: 'Tests and Info',
        description: 'Details and Tries',
        status: TodoStatusType['in-progress'],
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: undefined,
        owner: user,
    },
];
