## Packages
`npm install mongoose`
`npm install express`
`npm install express-async-errors`
`npm install dotenv`
`npm install http-status-codes`
`npm install jsonwebtoken`
`npm install bcryptjs`
`npm install helmet`
`npm install cors`
`npm install xss-clean` // Warn! Not supported!
`npm install express-rate-limit`
`npm install swagger-ui-express`
`npm install yamljs` // Warn
`npm install nodemon -D`

## Engines
Add `"engines": { "node": "20.14.0" }` to package.json to specify the node version when deploying the app!

## .env
MONGO_URI
JWT_SECRET
JWT_LIFETIME

## Run the app
1. Without nodemon: `npm start`
2. With nodemon: `npm run dev`

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean, NOT Supported!
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
