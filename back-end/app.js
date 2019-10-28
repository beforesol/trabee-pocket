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
const selectRouter = require('./routes/select');

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
app.use('/api/tests', tests); //add
app.use('/api/select', selectRouter);

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

// const xml2js = require('xml2js');
// const parser = new xml2js.Parser();
// const Country = require('./models/country');
//
// const request = require('request');
//
// const url = 'http://apis.data.go.kr/1262000/CountryBasicService/getCountryBasicList?serviceKey=6UuRcLliRjeNtE%2BFMDAGWD4xS8IjaSeK1lvwKz2gxSYosN9qk1qx47WZhmSQqk2N7WGNvWk%2Blh9pEZannSf9oA%3D%3D&numOfRows=197&pageNo=1';
//
// request({
//   url: url,
//   method: 'GET'
// }, function (error, response, body) {
//   const countryMap = [];
//   parser.parseString(body, function(err, result) {
//     const items = result.response.body[0].items[0].item;
//
//     items.forEach(item => {
//       const country = {
//         id: item.id[0],
//         name: item.countryName[0],
//         en: item.countryEnName[0],
//         imgUrl: item.imgUrl[0]
//       }
//       const newItem = countryMap.some((map, index) => {
//         if (map.continent === item.continent[0]) {
//           countryMap[index].countries.push(country);
//           return true;
//         }
//       });
//
//       if (!newItem) {
//         countryMap.push({
//           continent: item.continent[0],
//           countries: [country]
//         });
//       }
//     })
//   });
//
//
//   console.log(countryMap);
//   // countryMap.forEach(map => {
//   //   const countryDB = new Country();
//   //   countryDB.continent = map.continent;
//   //   countryDB.countries = map.countries;
//   //
//   //   countryDB.save(function(err) {
//   //     if (err) {
//   //       console.log(err);
//   //       return;
//   //     }
//   //   });
//   // })
// });
//
