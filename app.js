var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var dashboardRouter = require('./routes/dashboard');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var aboutRouter = require('./routes/about');
var blogRouter = require('./routes/blog');
var contactRouter = require('./routes/contact');
var departmentRouter = require('./routes/department');
var doctorRouter = require('./routes/doctor');
var elementsRouter = require('./routes/elements');
var singleblogRouter = require('./routes/single-blog');
var bookinglistRouter = require('./routes/bookinglist');
var userdashboardRouter = require('./routes/userdashboard');
var reportuploadRouter = require('./routes/reportupload');
var userappoinmentdetailsRouter = require('./routes/userappoinmentdetails');
var makeappoinmentRouter = require('./routes/makeappoinment');
var admindashboardRouter = require('./routes/admindashboard');
var adminlogindRouter = require('./routes/adminlogin');
var adminregisterdRouter = require('./routes/adminregister');
var addadmindepartmentRouter = require('./routes/addadmindepartment');
var patientreportuploadRouter = require('./routes/patientreportupload');


var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/dashboard',dashboardRouter );
app.use('/register',registerRouter );
app.use('/login',loginRouter );
app.use('/logout',logoutRouter );
app.use('/about',aboutRouter );
app.use('/blog',blogRouter );
app.use('/contact',contactRouter );
app.use('/department', departmentRouter );
app.use('/doctor', doctorRouter );
app.use('/elements', elementsRouter );
app.use('/single-blog', singleblogRouter );
app.use('/bookinglist',  bookinglistRouter );
app.use('/userdashboard',  userdashboardRouter );
app.use('/reportupload',  reportuploadRouter );
app.use('/userappoinmentdetails',  userappoinmentdetailsRouter );
app.use('/makeappoinment',  makeappoinmentRouter );
app.use('/admindashboard',  admindashboardRouter );
app.use('/adminlogin',  adminlogindRouter );
app.use('/adminregister',  adminregisterdRouter );
app.use('/addadmindepartment',  addadmindepartmentRouter );
app.use('/patientreportupload',  patientreportuploadRouter );


app.use('/users', usersRouter);

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
