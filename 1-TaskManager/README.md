# Packages
- `npm install mongoose`
- `npm install express`
- `npm install dotenv`
- `npm install nodemon -D`

# .env
- MONGO_URI: connection string, remember to include the user, password, and database in the right place!

# HTTP Methods
## GET
- /api/v1/tasks: Get all tasks
- /api/v1/tasks/:id: Get single task

## POST
- /api/v1/tasks: Create the task

## PATCH
- /api/v1/tasks/:id: Update the task

## DELETE
- /api/v1/tasks/:id: Delete the task