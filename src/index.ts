import express, { Application } from 'express';
import cors from 'cors';
import env from 'dotenv';
import routes from "./routes";
import swaggerUi from "swagger-ui-express"

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

env.config();

const port = process.env.PORT || 5000;

app.use('/api/v1', routes);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);


if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

export default app;
