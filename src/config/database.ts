import { ConnectionOptions } from 'typeorm';
import { Todo, User } from '../models';

import env from 'dotenv';

env.config();

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
    entities: [Todo, User],
    synchronize: true,
};

export default config;
