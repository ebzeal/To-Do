 echo "Setting up todo-app_test"

 dropdb -h localhost -p 5432 --if-exists -U postgres "todo-app_test"
 createdb -h localhost -p 5432 -U postgres "todo-app_test"
 
 set PGPASSWORD='postgres'&& psql todo-app_test -U postgres < ./src/models/testDB/testDbMigrationAndSeeder.sql

 echo "$database completed"
