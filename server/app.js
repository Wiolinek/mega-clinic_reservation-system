const express = require ('express');
const path = require ('path');
const cors = require ('cors');
const passport = require ('passport');
const session = require ('express-session');
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

const indexRouter = require('./routes/index');
const specialitiesRouter = require('./routes/specialities');
const filter = require('./routes/doctors');
const timetable = require('./routes/timetable');
const form = require('./routes/form');
const login = require('./routes/login');
const user = require('./routes/login');
const logout = require('./routes/login');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60* 60 * 24 }
}))

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/specialities', specialitiesRouter);
app.use('/filter', filter);
app.use('/timetable', timetable);
app.use('/form', form);
app.use('/login', login);
app.use('/user', user);
app.use('/logout', logout);

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
