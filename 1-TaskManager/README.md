# Packages
- `npm install mongoose`
- `npm install express`
- `npm install dotenv`
- `npm install nodemon -D`

# .env
- MONGO_URI: connection string, remember to include the user, password, and database in the right place!

**Note that we don't have to manually create the database and collection in MongoDB Atlas in advance for all the projects, because the database name can be included in the connection string and the collection name can be determined by the model name, after running the app, they will be created!**

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