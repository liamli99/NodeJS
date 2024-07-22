# Node.js

## Introduction
Node.js is an environment to run JavaScript outside the web browser, it is built on Chrome's V8 JS engine, it has big community and is full-stack

## Node.js VS Browser
Browser: (1) DOM (2) Window (3) Interactive Apps (4) No Filesystem (5) Fragmentation (6) ES6 Modules

Node.js: (1) No DOM (2) No Window (3) Server Side Apps (4) Filesystem (5) Versions (6) CommonJS

## REPL VS CLI
REPL (Read-Eval-Print Loop): In the terminal, type `node` and press Enter. The usage is similar to browser console, it is a programming language environment that takes single expression as user input and returns the result back to the console after execution. REPL only provides a convenient way to quickly test simple JS code!

CLI (Command Line Interface): Save the JS code in a file, and run the file through command line by typing `node filename.js`. 

## Global Variables 
(1) `__dirname`: path to current directory
(2) `__filename`: file name
(3) `require`: function to use modules (CommonJS)
(4) `module`: information about current module (file)
(5) `process`: information about environment where the program is being executed   
There is no `window`!!!

## Modules
1. CommonJS modules. CommonJS modules are the original way to package JS code for Node.js. In Node.js, each file is treated as a separate module by default! 

2. ECMAScript modules. Node.js also supports ECMAScript modules, which are the official standard format to package JS code for reuse. See JavaScript for more examples!

For this course, we will use CommonJS modules, but ES modules works exactly the same with a different grammar!

3. Built-in Modules: e.g. (1) OS (2) PATH (3) FS (4) HTTP. For each module, it can provide useful properties and methods! For more details, see https://nodejs.org/docs/latest/api/

## Node Package Manager (npm)
`npm` comes bundled with Node.js and is the default package manager for Node.js, it helps developers share and reuse code!

### Initialization
(1) Manual approach: create a `package.json` file in the root with necessary properties
(2) General approach: `npm init` (answer a series of questions step by step to set up the project) OR `npm init -y` (answer all the questions with default values), then a 'package.json' file will be generated!

Note that 'package.json' file provides information about the project and is used to manage the project! For example, 'main' is a file that is the entry point of the project. 'scripts' is a dictionary that contains script commands that are run at various times in the lifecycle of the project, e.g. `{ "start": "node app.js", "dev": "nodemon app.js" }`, so that we can use `npm start` to run the start script and use `npm run dev` to run the dev script!

### Install packages
**Install packages as dependencies**, dependencies are packages required by the project to run in production!
(1) Install a local package (use it in the current project), recommended!
`npm install <packagename>`
(2) Install a global package (use it in any project)
`sudo npm install -g <packagename>`

**Install packages as dev dependencies**, dev dependencies are packages that are only needed for local development and testing!
`npm install <packagename> --save-dev` OR `npm install <packagename> -D`

Note that all the local packages we install are stored in node_modules folder and are included in dependencies/devDependencies of package.json! After we install a local package, a 'package-lock.json' file will be generated!!   

Normally we won't push node_modules folder to github, so that if we clone a Node.js project from github, we can run `npm install` to install all the packages in dependencies/devDependencies of package.json! However, if we want to manually install all the packages with certain versions, we can delete dependencies/devDependencies of package.json and delete package-lock.json file, then use `npm install <packagename>` to manually download the packages!!!  

### Use packages
Similar to modules, we can use require (CommonJS Modules) or import (ES Modules) to include the package! For more details, see https://www.npmjs.com/




## Useful packages
### nodemon 
- [Tutorial](https://www.npmjs.com/package/nodemon)
- `npm install nodemon -D`
- It can automatically restart the node project when the file changes!
- If we use `npm install nodemon -D` to install the package locally as dev dependency, then we can add `"start": "nodemon app.js"` to scripts of package.json so that we can use `npm start` to run the project using nodemon OR we can add `"dev": "nodemon app.js"` to scripts of package.json so that we can use `npm run dev` to run the project using nodemon! However, if we use `npm install -g nodemon` to install the package globally, then we can directly use `nodemon app.js` to run the project using nodemon!

### dotenv
- [Tutorial](https://www.npmjs.com/package/dotenv)
- `npm install dotenv`
- It loads environment variables from a `.env` file into `process.env`!
- 1. Create a `.env` file in the root of the project to store environment variables and their values in the format `KEY=value`   
  2. Add `require('dotenv').config();` in the beginning of the entry file (app.js)   
  3. Use `process.env.KEY` to accesss the environment variable's value!

1. express-async-errors
It can simplify error handling in async functions by automatically catching errors and passing them to the next error-handling middleware, so that we don't have to write try-catch blocks in each async route handler!   

We use `npm install express-async-errors` to install this package! Then, (1) Load `require('express-async-errors')` in the entry file (app.js), (2) Remove all try catch blocks in async functions and only keep the code in try! This is becasue error in catch can be automatically passed to the next error-handling middleware!

4. jsonwebtoken
It is used for creating and verifying JSON Web Tokens, and decoding their payloads!
https://www.npmjs.com/package/jsonwebtoken

5. http-status-codes
https://www.npmjs.com/package/http-status-codes

6. bcryptjs
It can help hash the password!

7. helmet
It helps secure the app by setting HTTP response headers

8. cors
CORS (Cross-origin resource sharing) is a mechanism that allows a web page to access restricted resources from a server on a domain different than the domain that served the web page! This package can be used to enable CORS with various options.

9. xss-clean 
NOT SUPPORTED!!!

10. express-rate-limit
It is used to limit reperated requests!
https://www.npmjs.com/package/express-rate-limit


11. express-fileupload
https://www.npmjs.com/package/express-fileupload

12. cloudinary
Tutorial: https://console.cloudinary.com/pm/c-a9b9a36336c6867b314571bb11651f/getting-started

Configuration information (Cloud name, API Key, and API Secret): Programmable Media -> Dashboard -> Product Environment -> Go to API Keys
https://console.cloudinary.com/settings/c-a9b9a36336c6867b314571bb11651f/api-keys

Stored files (images, videos, etc): Assets -> Media Library -> Folders
https://console.cloudinary.com/console/c-a9b9a36336c6867b314571bb11651f/media_library/folders/home?view_mode=list


13. Nodemailer
Send emails: https://nodemailer.com/
14. Ethereal
A fake SMTP service that is used only for testing! It allows you to send emails without actually delivering them!
https://ethereal.email/
15.  SendGrid
A cloud-based SMTP service that is used in production!

16. Stripe
Tutorial: https://docs.stripe.com/payments/quickstart
API Keys: https://dashboard.stripe.com/test/apikeys
Payments: https://dashboard.stripe.com/test/payments

## Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick

## Stream
Streams in Node.js are efficient data-handling abstractions that enable reading or writing large data pieces in small, manageable chunks, rather than loading everything into memory at once.

There are 4 types of streams: (1) Readable: streams from which data can be read (2) Writable: streams to which data can be written (3) Duplex: streams that are both Readable and Writable (4) Transform: Dulex streams that can modify or transform the data as it is written and read 


# Express

## HTTP Request/Response Cycle
https://www.course-api.com/images/slides/slide-4.png

## HTTP Messages
https://www.course-api.com/images/slides/slide-5.png
https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

Request: (1) Request line (HTTP method, request target, HTTP version) (2) Headers (3) Body, optional
Response: (1) Status line (HTTP version, status code, status text) (2) Headers (3) Body, optional

## HTTP Methods
https://www.course-api.com/images/slides/slide-6.png

### GET
Client: send a GET request to the endpoint with or without route parameters (req.params)
Server: get the data (based on req.params), send a response
### POST
Client: send a POST request with data (app.use(express.json()), req.body) to the endpoint
Server: create the new data based on req.body, send a response
### PUT/PATCH
Client: send a PUT/PATCH request with data (app.use(express.json()), req.body) to the endpoint with route parameters (req.params)
Server: find the data based on req.params and update that data based on req.body, send a response
Note that PUT is used to replace the entire resource, while PATCH is used to update part of the resource!!!
### DELETE
Client: send a DELETE request to the endpoint with route parameters (req.params)
Server: find the data based on req.params and delete that data, send a response

## Express
https://expressjs.com/

## API VS SSR
### API (Application Programming Interface)
API typically refers to RESTful or GraphQL endpoints that allow the client to communicate with the server to fetch, create, update, or delete data. The data is in JSON format!

The server sends data in JSON, we use `res.json()`

### SSR (Server-Side Rendering)
SSR involves rendering the entire HTML for a webpage on the server side before sending it to the client

The server sends template, we use `res.render()`

## Middleware
https://expressjs.com/en/guide/writing-middleware.html
https://expressjs.com/en/guide/using-middleware.html

Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the next middleware function.

Middleware functions can perform the following tasks: (1) Execute any code. (2) Make changes to the request and the response objects. (3) End the request-response cycle. (4) Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it MUST call next() to pass control to the next middleware function. Otherwise, the request will be left hanging!

There are different kinds of middleware: (1) Our own middleware (2) Built-in middleware (3) Third-party middleware

Built-in Middleware: 07-http-methods

## Postman
Postman is an API platform for developers to design, build, test, and collaborate on APIs.
req.query: Params
req.body: 
Body -> raw -> JSON

req.files (using 'express-fileupload')
Upload images: Body -> form-data -> Key (choose 'File'), Value (Select file from local machine)

Headers
Authorization
Scripts


## Express Router
https://expressjs.com/en/guide/routing.html
Express Router is a mini Express application that groups related routes together! Since router can be created as a module, we can first import it in the main file. Since router is a middleware, we can then mount the router module on a specific path in the main file!!! 

## Error Handling
1. Errors that occur in synchronous function: `throw new Error(...)`
2. Errors that occur in asynchronous function: `next(error)`

Note: 
(1) For errors that occur in sync function, we can use `throw` or `next` to pass the error to error-handling middleware

(2) For errors that occur in async function, we must use `next` to pass the error to error-handling middleware! If there exists a try catch block, 'catch' can handle the rejected value of the promise or the thrown error! We must use `next` in 'catch' to pass the error to error-handling middleware! But 'try' can use `throw` to propagate error to 'catch' or use `next` to pass error to error-handling middleware! 

However, if we load 'express-async-errors' which can autamatically catch errors (rejected or thrown) in async function and pass them to the next error-handling middleware, then we only need to keep the code in 'try'!!!

(3) For all errors that occur in sync/async function, we can use `next` to directly pass the error to error-handling middleware! Pay attention that if there is further execution after next, we must write `return next` to exit the function to prevent further execution! This is similar to res.send/json! Different from `next`, `throw` can exit the function immediately!


# MongoDB

## MongoDB Atlas
MongoDb Atlas is a cloud database service!
Tutorial: https://www.mongodb.com/docs/atlas/getting-started/
Login: https://account.mongodb.com/account/login
(1) Create an Atlas account 
(2) Deploy a free cluster
(3) Manage database users: SECURITY - Database Access
(4) Manage the IP access list: SECURITY - Network Access
(5) Connect to the cluster: Data Services - Connect - Drivers - Connection string
(6) Create database inside the cluster: Data Services - Add data - Create Database on Atlas. Note that we don't have to create the database and collection in advance for all the projects, because the database name can be included in the connection string and the collection name can be determined by the model name, after running the app, they will be created!

Structure: Organization (Liam) -> Project (Node and Express Course Project) -> Cluster (NodeExpressProject) -> Database -> Collection -> Document   

Collection is similar to table and Document is similar to record! Each document is composed of field-value pairs, similar to key-value pairs in JSON!  

## Mongoose
General Tutorial: https://mongoosejs.com/

Connection: 
https://mongoosejs.com/docs/connections.html
https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.connect()


Schema: 
https://mongoosejs.com/docs/guide.html
https://mongoosejs.com/docs/schematypes.html


Model: 
https://mongoosejs.com/docs/models.html

CRUD:
(1) Create:
https://mongoosejs.com/docs/models.html#constructing-documents
https://mongoosejs.com/docs/api/model.html#Model.create()

(2) Read:
https://mongoosejs.com/docs/queries.html
https://mongoosejs.com/docs/api/model.html#Model.find()
https://mongoosejs.com/docs/api/model.html#Model.findOne()

https://www.mongodb.com/docs/manual/reference/operator/query/

Sort:
https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()

**Order: find -> sort -> select -> limit!!!!!!!!**

(3) Update:
https://mongoosejs.com/docs/queries.html
https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()

(4) Delete:
https://mongoosejs.com/docs/queries.html
https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
https://mongoosejs.com/docs/api/model.html#Model.deleteMany()

Middleware: https://mongoosejs.com/docs/middleware.html

Instance methods: https://mongoosejs.com/docs/guide.html#methods


## JWT
https://jwt.io/introduction
https://jwt.io/#debugger-io
https://self-issued.info/docs/draft-ietf-oauth-json-web-token.html