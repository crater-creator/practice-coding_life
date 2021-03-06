var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport')
const passportconfig = require('./passport');
var helmet = require('helmet')
var assert = require('assert')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));//뷰 페이지의 폴더 기본 경로로 __dirname+views 이름의 폴더를 사용하겠다.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //public폴더에 대한 접근을 가상 경로인 /로 설정함.
// app.use('/views', express.static(path.resolve(__dirname, 'views')));
// app.use('/public', express.static(path.resolve(__dirname, 'public'))); 

// app.use(session({secret: '비밀코드', resave: true, saveUninitialized:false})); //세션활성화
// app.use(passport.initialize()); //passport 구동
// app.use(passport.session()); //세션 연결
// passportconfig();

//세션 미들웨어 설정
app.use(session({
  secret
}))




app.use('/', indexRouter);
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
