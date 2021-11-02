import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import cors from 'cors';
import env from 'dotenv';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import dbConfig from './config/database';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

env.config();

const port = process.env.PORT || 5000;

app.use('/api/v1', routes);

app.use(
    '/api/v1/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: '/swagger.json',
        },
    }),
);

createConnection(dbConfig)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Unable to connect to db', err);
        process.exit(1);
    });

export default app;
