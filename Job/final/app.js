require('dotenv').config();
require('express-async-errors');

// Security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean'); // Not supported!
const rateLimit = require('express-rate-limit');

const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const authentication = require('./middleware/authentication');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');


// Built-in Middleware
app.use(express.json());

// Third-pary Middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // Remember requests for 15 min
  limit: 100 // Limit each IP to 100 requests per 'window' (here, per 15 min)
}));


// Routes
app.use('/api/v1/auth', authRouter);
// Load authentication middleware before jobsRouter to verify the token before creating/reading/updating/deleting the job!
app.use('/api/v1/jobs', authentication, jobsRouter);

// Custom Middleware
app.use(notFound);
app.use(errorHandler);

// Note that we normally don't store 'PORT' in .env, because when we deploy this backend application, the cloud service provider always provides this environment variable!!!
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