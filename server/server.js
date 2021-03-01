const express = require('express');
const errorHandler = require('./middleware/error');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// LOAD ROUTE FILES
const users = require('./routes/users');
const posts = require('./routes/posts');
const profiles = require('./routes/profiles');
const auth = require('./routes/auth');
const quotes = require('./routes/quotes');
const upload = require('./routes/s3-upload');

const app = express();

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// MIDDLEWARE from express ~ Body Parser ~ allows us to use req.body and others..
app.use(express.json());

// MOUNT ROUTERS
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/quotes', quotes);
app.use('/api/v1/upload', upload);

// MOUNT ERROR HANDLER ~ MUST BE AFTER ROUTERS BECAUSE MIDDLEWARE IS EXECUTED IN LINEAR ORDER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Global handle unhandled promise rejections...
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exist process;
  server.close(() => process.exit(1));
});
