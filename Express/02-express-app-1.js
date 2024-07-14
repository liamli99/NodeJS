// Equivalent to 01-http-multiple-files.js

const { readFileSync } = require('fs');

const express = require('express');
const app = express();

const homePage = readFileSync('./resources/navbar-app/index.html', 'utf8');
const homeStyles = readFileSync('./resources/navbar-app/styles.css');
const homeImage = readFileSync('./resources/navbar-app/logo.svg');
const homeLogic = readFileSync('./resources/navbar-app/browser-app.js');

app.get('/', (req, res) => {
    res.status(200).send(homePage);
});

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About Page</h1>');
});

app.get('/styles.css', (req, res) => {
    res.status(200).type('text/css').send(homeStyles);
});
app.get('/browser-app.js', (req, res) => {
    res.status(200).type('text/javascript').send(homeLogic);
});
app.get('/logo.svg', (req, res) => {
    res.status(200).type('image/svg+xml').send(homeImage);
});

app.use((req, res) => res.status(404).send('<h1>Page Not Found</h1>'));

// Alternative solution
// app.all('*', (req, res) => {
//     res.status(404).send('<h1>Page Not Found</h1>');
// });

app.listen(5001, () => {
    console.log('Server is listening on port 5001');
});