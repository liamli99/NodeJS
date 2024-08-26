require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// Security
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean'); // Not supported!

const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connect');



// Third-pary Middleware
// https://express-rate-limit.mintlify.app/guides/troubleshooting-proxy-issues#the-global-limiter-problem
app.set('trust proxy', 1); 
// Apply rate limit to all requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // Remember requests for 15 min
  limit: 60 // Limit each IP to 60 requests per 'window' (here, per 15 min)
}));
app.use(helmet());
app.use(cors());
app.use(xss());

// Since controllers/authController.js sets JWT as a signed cookie, we should pass a secret string to cookieParser to enable signed cookie! Now the authentication middleware can use 'req.signedCookies.token' to access the token!
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

// Built-in Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

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