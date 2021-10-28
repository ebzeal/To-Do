import express, { Application } from 'express';
import cors from 'cors';
import env from 'dotenv';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

env.config();

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

export default app;
