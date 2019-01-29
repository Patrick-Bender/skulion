var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var Auth0Strategy = require('passport-auth0');
var passport = require('passport');

var app = express();

//auth 0 stuff
//session
var sess = {
 secret: 'NQ5VjkzOOYmCFXhvDRyz',
 cookie: {},
 resave: false,
 saveUninitialized: true
};


if (app.get('env') === 'production') {
 sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

//passport-auth0
var strategy = new Auth0Strategy({
  domain: 'skulion.auth0.com',
  clientID: 'AnQPh0KypzbWV9fuUFRO7rfqscL0YTFG',
  clientSecret: '9A8nDGP0fUOb-GLcW9ff_VwBgGtDN69fXI1aZoaNRVp9FmMO7gWE_oRCeBadHZfW', // Replace this with the client secret for your app
  callbackURL: 'https://skulion-axiomaticspace.c9users.io/callback',
  state: true
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Look up session to know if user is logged in - help to conditionally show stuff depending on if a user is logged in
app.use(function(req, res, next) {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user !== 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signupRouter = require('./routes/signup');
var submitRouter = require('./routes/submit');
//auth0 routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/posts");


//routes

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/submit', submitRouter);
//auth 0 routes
app.use('/', authRouter);



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

app.listen(process.env.PORT, function(){
  console.log("Server Started");
})
