const express = require('express');
var cors = require('cors');
const AppError = require('./utils/appError');
const fileupload = require("express-fileupload")
const app = express();
const swaggerUI=require("swagger-ui-express")
const limiter = require('express-rate-limit')({
    max: 100,
    windowMs: 1000,
    message: 'Too many requests from this IP, please try again in an hour',
});
app.use(
    cors({
        origin: '*',
    })
);
app.use(require('morgan')('dev'));
app.use('/', limiter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/static`));  
app.use(fileupload())

app.use('/users', require('./routes/users/usersRouter'));
app.use('/admin', require('./routes/admin/adminRouter'));
app.use('/public', require('./routes/public/publicRouter'));
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(require("./utils/docsOptions")))
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(require('./controllers/errorController'));
module.exports = app;