## HTTP Request/Response Cycle
https://www.course-api.com/images/slides/slide-4.png

## HTTP Messages
https://www.course-api.com/images/slides/slide-5.png
https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

Request: (1) Request line (HTTP method, request target, HTTP version) (2) Headers (3) Body, optional
Response: (1) Status line (HTTP version, status code, status text) (2) Headers (3) Body, optional

## HTTP Methods
https://www.course-api.com/images/slides/slide-6.png

what is endpoint?
### GET
Client: send a GET request to the endpoint
Server: send a response
### POST
Client: send a POST request with data (req.body) to the endpoint
Server: create the new data based on req.body, send a response
### PUT
Client: send a PUT request with data (req.body) to the endpoint with route parameters (req.params)
Server: find the data based on req.params and update that data based on req.body, send a response
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

## Postman
Postman is an API platform for developers to design, build, test, and collaborate on APIs.

## Express Router
https://expressjs.com/en/guide/routing.html
Express Router is a mini Express application that groups related routes together! Since router can be created as a module, we can first import it in the main file. Since router is a middleware, we can then mount the router module on a specific path in the main file!!! 
