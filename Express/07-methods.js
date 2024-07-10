const express = require('express');
const app = express();

const { people } = require('./resources/data');

// Built-in middleware

// It serves static files from a directory. If we navigate to root url ('/'), Express will look for a default file (index.html) to serve!
// https://expressjs.com/en/starter/static-files.html
app.use(express.static('./resources/methods-public'));

// It parses incoming requests with url-encoded data, so that 'req.body' contains the parsed data!!! This is used for POST form example!
// https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));

// It parses incoming requests with JSON data, so that 'req.body' contains the parsed data!!! This is used for POST javascript example!
// https://expressjs.com/en/4x/api.html#express.json
app.use(express.json());

// GET: Read, POST: Create, PUT: Update, DELETE: delete

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
})


app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});