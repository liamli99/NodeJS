## HTTP Request/Response Cycle
https://www.course-api.com/images/slides/slide-4.png

## HTTP Messages
https://www.course-api.com/images/slides/slide-5.png
https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

Request: (1) Request line (HTTP method, request target, HTTP version) (2) Headers (3) Body, optional
Response: (1) Status line (HTTP version, status code, status text) (2) Headers (3) Body, optional

## HTTP Methods
https://www.course-api.com/images/slides/slide-6.png

## Express
https://expressjs.com/
https://expressjs.com/en/api.html

## API VS SSR
### API (Application Programming Interface)
API typically refers to RESTful or GraphQL endpoints that allow the client to communicate with the server to fetch, create, update, or delete data. The data is in JSON format!

The server sends data in JSON, we use `res.json()`

### SSR (Server-Side Rendering)
SSR involves rendering the entire HTML for a webpage on the server side before sending it to the client

The server sends template, we use `res.render()`
