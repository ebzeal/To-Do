import { checkSchema } from 'express-validator';

const createTodoSchema = checkSchema({
    name: {
        in: 'body',
        customSanitizer: {
            options: (name) => (typeof name === 'string' ? name.trim() : 1),
        },
        isEmpty: {
            negated: true,
            errorMessage: 'name cannot be empty',
        },
        isString: {
            errorMessage: 'name has to be a string',
        },
        isLength: {
            options: {
                min: 2,
            },
            errorMessage: 'name is too short',
        },
    },
    description: {
        in: 'body',
        customSanitizer: {
            options: (description) => (typeof description === 'string' ? description.trim() : 1),
        },
    },
    dueDate: {
        in: 'body',
        custom: {
            options: (value: string) => {
                if (value) {
                    if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value) !== true) {
                        throw new Error('Due Date should match YYYY-MM-DD');
                    } else {
                        return value;
                    }
                } else {
                    return '0000-00-00';
                }
            },
        },
    },
});

const updateTodoSchema = checkSchema({
    name: {
        in: 'body',
        custom: {
            options: (value: string) => {
                if (value) {
                    if (typeof value !== 'string') throw new Error('name has to be a string');
                    if (value.length < 2) {
                        throw new Error('name is too short');
                    } else {
                        return value;
                    }
                } else {
                    return '';
                }
            },
        },
    },
    description: {
        in: 'body',
        customSanitizer: {
            options: (description) => (typeof description === 'string' ? description.trim() : 1),
        },
    },
    dueDate: {
        in: 'body',
        custom: {
            options: (value: string) => {
                if (value || value?.length > 0) {
                    if (/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value) !== true) {
                        throw new Error('Due Date should match YYYY-MM-DD');
                    } else {
                        return value;
                    }
                } else {
                    return '0000-00-00';
                }
            },
        },
    },
});
export { createTodoSchema, updateTodoSchema };
