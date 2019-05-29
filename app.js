const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const shopsRouter = require('./routes/shops');
const groupRouter = require('./routes/group');
const manageRouter = require('./routes/manage');
const menuRouter = require('./routes/menu');

const app = express();

/**
 * setting session param
*/
app.use(session({
  secret: 'betukaikei',
  resave: false,
  saveUninitialized: false,
  cookie: {
//    httpOnly: true,
//    secure: true,
    maxAge:  365 * 24 * 60 * 60 * 1000,
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', indexRouter);
app.use('/group', groupRouter);
app.use('/shop', shopsRouter);
app.use('/manage', manageRouter);
app.use('/menu', menuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
