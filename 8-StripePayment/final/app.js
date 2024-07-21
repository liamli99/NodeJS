require('dotenv').config();
require('express-async-errors');

const stripeController = require('./controllers/stripeController');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/api/v1/stripe', stripeController);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
