const express = require ('express');
const path = require ('path');
const cors = require ('cors');
const passport = require ('passport');
const session = require ('express-session');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const createError = require('http-errors');
const logger = require('morgan');
const mongoose = require('mongoose');

dotenv.config()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to DB'))

const indexRouter = require('./routes/index'); //not for deploy
const specialitiesRouter = require('./routes/specialities');
const doctors = require('./routes/doctors');
const timetable = require('./routes/timetable');
const form = require('./routes/form');
const login = require('./routes/login');
const userAccount = require('./routes/user-account');
const logout = require('./routes/logout');
const visits = require('./routes/visits');
const labels = require('./routes/labels');
const sendEmail = require('./routes/sendEmail');
const articles = require('./routes/articles');
const pacients = require('./routes/pacients');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({
  // origin: 'https://megaclinic.ultra-violet.codes/',
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SECRET_CODE,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60* 60 * 24,
    httpOnly: false
  }
}));
app.use(cookieParser(process.env.SECRET_CODE));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter); //not for deploy
app.use('/api/specialities', specialitiesRouter);
app.use('/api/doctors', doctors);
app.use('/api/timetable', timetable);
app.use('/api/form', form);
app.use('/api/login', login);
app.use('/api/user-account', userAccount);
app.use('/api/logout', logout);
app.use('/api/visits', visits);
app.use('/api/labels', labels);
app.use('/api/send', sendEmail);
app.use('/api/articles', articles);
app.use('/api/pacients', pacients);
// app.get('/*', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// })

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
