require('dotenv').config({ path: `${process.cwd()}/.env`});
const express = require('express');
const authRouter = require('./route/authRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

// ALL ROUTES
app.use('/api/v1/auth', authRouter);

app.use('*', catchAsync(async (req, res, next) => {
    throw new AppError(`${req.originalUrl} could not be found. Check your URL and try again.`, 404)
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log('server up', PORT);
});