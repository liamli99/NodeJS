require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');



app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFound);
app.use(errorHandler);

// Note that this project doesn't need database!
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
