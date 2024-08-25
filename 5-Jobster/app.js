require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const path = require('path');

// Security
const helmet = require('helmet');
const xss = require('xss-clean'); // Not supported!

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const authentication = require('./middleware/authentication');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');



// Third-pary Middleware
// We remove cors becasue we don't want external JS apps to access our API (except our front-end)!
// We use express-rate-limit in routes/auth.js instead of app.js because we don't want to apply rate limit to all the requests!
// https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues#the-global-limiter-problem
app.set('trust proxy', 1); 
app.use(helmet());
app.use(xss());

// Built-in Middleware
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentication, jobsRouter);

// For any other get requests, the server serves index.html!
// This is very important, we should place it at this exact position! 
// React Router?
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

// Custom Middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
