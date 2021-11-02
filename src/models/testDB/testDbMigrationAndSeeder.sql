-- CREATE DATABASE "todo-app_test";
-- \connect "todo-app_test"

DROP TABLE IF EXISTS "user", todo;

   CREATE TABLE IF NOT EXISTS
        "user"(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        "fullName" VARCHAR(128),
        "userName" VARCHAR(128) NOT NULL,
        password VARCHAR(500) NOT NULL,
        "createdAt" DATE NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" DATE NOT NULL DEFAULT CURRENT_DATE
      );

CREATE TABLE IF NOT EXISTS
      todo(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        description VARCHAR(128),
        status VARCHAR(28) NOT NULL,
        user_id INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
        "dueDate" DATE NOT NULL DEFAULT CURRENT_DATE + INTERVAL '1 DAY' ,
        "createdAt" DATE NOT NULL DEFAULT CURRENT_DATE,
        "updatedAt" DATE NOT NULL DEFAULT CURRENT_DATE
      );


INSERT INTO "user" (email, "fullName", "userName", password)VALUES('olu@me.com','olu Sola','olu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJFbWFpbCI6Im9sdUBtZS5jb20iLCJhY2Nlc3MiOiJBZG1pbiIsImlhdCI6MTU4MDI5OTY4NiwiZXhwIjoxNjQzMzcxNjg2fQ.DEvUL4rmTthxLqAkH4rIYAKEvJQ9CyLkabMrXogyBzg'),('bar@ney.com', 'Bar Ney', 'barney', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJFbWFpbCI6ImJhckBuZXkuY29tIiwiYWNjZXNzIjoiVXNlciIsImlhdCI6MTU4MDI5OTc5MCwiZXhwIjoxNjQzMzcxNzkwfQ.4hn40LrFiOt6Gmyoj1b8sbXuAYA-aICneob4jDJCVEQ');

INSERT INTO todo(name, description, status, user_id)VALUES('Scrub Floors','A tiring chore', 'in-progress', 1),('Complete PR','Get the task and reviews sorted', 'in-progress', 1),('Call Grandma','Yeah, just do it', 'in-progress', 2),('Fill form','', 'in-progress', 2);
