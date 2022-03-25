const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const fileuplaod = require('express-fileupload');
//Adding env variables path
dotenv.config('.env');

//Import routes
const userRouter = require('./routes/v1/user-router');
const tourRouter = require('./routes/v1/tour-router');
const authRouter = require('./routes/v1/auth-router');

//custom middlewares
const errorHandler = require('./middlewares/error-handler');

//Initiate express instance
const app = express();

//Middlwares
app.use(express.json());
app.use(fileuplaod());
app.use(morgan('dev'));//temp

//Serving static files
app.use(express.static(path.join(__dirname, '/public')));

//Routing 
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/', authRouter);
app.use('*', (req, res) => res.status(404).send('WRONG URL'));
app.use(errorHandler);
module.exports = app;