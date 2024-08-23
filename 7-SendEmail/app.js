require('dotenv').config();
require('express-async-errors');

const { sendEmailEthereal } = require('./controllers/sendEmail');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.send('<a href="/api/v1/send">Send Email</a>');
});
app.get('/api/v1/send', sendEmailEthereal);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is listening on port ${port}...`)
);
