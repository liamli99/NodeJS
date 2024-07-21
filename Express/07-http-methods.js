const express = require('express');
const app = express();

const { people } = require('./resources/data');

// Built-in middleware

// It serves static files from a directory. If we navigate to root url ('/'), Express will look for a default file (index.html) to serve!
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('./resources/methods-public'));

// This is only used in POST and PUT requests! So that we can use 'req.body' to access the data in the body of POST and PUT requests!
// It parses incoming requests with url-encoded data (request body), so that 'req.body' contains the parsed data!!! This is used for POST form example!
// https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

// This is only used in POST and PUT requests! So that we can use 'req.body' to access the data in the body of POST and PUT requests!
// It parses incoming requests with JSON data (request body), so that 'req.body' contains the parsed data!!! This is used for POST javascript example and PUT example!
// https://expressjs.com/en/4x/api.html#express.json
app.use(express.json());

// GET: Read, POST: Create, PUT: Update, DELETE: delete
// We can use Postman to test these methods instead of creating the frontend!

// GET, default HTTP method
app.get('/api/people', (req, res) => {
    res.status(200).json({ success: true, data: people });
});

// POST, form example in localhost:5001/index.html
// In './resources/methods-public/index.html', the action attribute of form element has value '/login', it represents the url where the form data should be sent when the form is submitted, so that we should also define such endpoint to handle POST request!
app.post('/login', (req, res) => {
    console.log(req.body);
    
    const { name } = req.body;
    if (name) {
        res.status(200).send(`Welcome ${name}`);
    } else {
        res.status(401).send('Please provide your name');
    }
});

// POST, javascript example in localhost:5001/javascript.html
// In './resources/methods-public/javascript.html', since it includes 'axios.post('/api/people', { name: nameValue })', we should also define such endpoint to handle POST request! 
app.post('/api/people', (req, res) => {
    console.log(req.body);

    const { name } = req.body;
    if (name) {
        res.status(201).json({ success: true, person: name });
    } else {
        res.status(400).json({ success: false, msg: 'Please provide your name' });
    }
});

// PUT
// Client: send a PUT request with data (req.body) to the endpoint with route parameters (req.params)
// Server: find the data based on req.params and update that data based on req.body, send a response
app.put('/api/people/:id', (req, res) => {
    console.log(req.params);
    console.log(req.body);

    const { id } = req.params;
    const { name } = req.body;
    
    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        // Note that res.send/res.json can only be called once per request because they can end the request-response cycle, so that it is a good practice to include 'return' before res.send/res.json to prevent further execution. Including 'return' can exit the function immediately after sending the response! However, if there is no further code to execute after res.send/res.json, we can ignore return!
        return res.status(404).json({ success: false, msg: 'Person Not Exist' });
    }

    // Update
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            // 'people' is updated!!!
            person.name = name;
        }
        return person;
    })
    res.status(200).json({ success: true, data: newPeople });
});

// DELETE
// Client: send a DELETE request to the endpoint with route parameters (req.params)
// Server: find the data based on req.params and delete that data, send a response
app.delete('/api/people/:id', (req, res) => {
    console.log(req.params);

    const { id } = req.params;

    const person = people.find((person) => person.id === Number(id));
    if (!person) {
        return res.status(404).json({ success: false, msg: 'Person Not Exist' });
    }

    // Delete
    const newPeople = people.filter((person) => {
        return person.id !== Number(id);
    })
    res.status(200).json({ success: true, data: newPeople });
});

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});