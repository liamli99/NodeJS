# Packages
`npm install mongoose`
`npm install express`
`npm install dotenv`
`npm install nodemon -D`

# .env
MONGO_URI is the connection string, remember to include the user, password, and database name in the right place!

# HTTP Methods
## GET
1. /api/v1/tasks: Get all tasks
2. /api/v1/tasks/:id: Get single task

## POST
1. /api/v1/tasks: Create the task

## PATCH
1. /api/v1/tasks/:id: Update the task

## DELETE
1. /api/v1/tasks/:id: Delete the task