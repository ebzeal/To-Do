export enum TodoStatusType {
    'in-progress' = 'in-progress',
    'completed' = 'completed',
}

export interface AddTodoInterface {
    name: string;
    /**
     * @example "description is optional"
     */
    description?: string;
    /**
     * @example "dueDate is optional, but if added, it must have a YYYY-MM-DD format"
     */
    dueDate?: string;
}

export interface UpdateTodoInterface {
    name?: string;
    description?: string;
    status: TodoStatusType;
    /**
     * @example "it must have a YYYY-MM-DD format"
     */
    dueDate?: string;
}
