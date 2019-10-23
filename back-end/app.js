const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tests = require('./routes/test'); //add

const app = express();

// mongoose.connect('mongodb://localhost:270217/trabee-web');
// mongoose.connect('mongodb://localhost:27918/trabee-web');
mongoose.connect('mongodb+srv://user:2017@cluster0-hqi94.mongodb.net/trabee-web?retryWrites=true&w=majority');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/tests',tests); //add

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

var request = require('request');

var url = 'http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent('6UuRcLliRjeNtE%2BFMDAGWD4xS8IjaSeK1lvwKz2gxSYosN9qk1qx47WZhmSQqk2N7WGNvWk%2Blh9pEZannSf9oA%3D%3D'); /* 공공데이터 포털에서 발급받은 인증키 */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('197'); /* 한페이지의 결과 */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */

request({
  url: url + queryParams,
  method: 'GET'
}, function (error, response, body) {
  console.log('Status', response.statusCode);
  console.log('Headers', JSON.stringify(response.headers));
  console.log('Reponse received', body);
});
