var {mongoose,Timeline} = require('./db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var testRouter = require('./routes/test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/test', indexRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

//设置允许跨域访问该服务.
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);


app.get("/addTimeLine", function (request, response) {
  let data = {
    title: "新感觉俄罗斯方块游戏",
    type: "游戏",
    time: "2020-2-12",
    status: "overdue",
    content:
      "新感觉是一种现代艺术流派，强调通过全方位的感官描写，重新理解事物。以新感觉的手法为前提，我想对俄罗斯方块这一经典的游戏类型做一款从视听觉以及心理感受层面有所突破的创新性作品。"
  };
  console.log(data)
  var addTimeLineData = new Timeline(data)
  addTimeLineData.save()
  response.send(JSON.stringify(data))
})

app.get('/searchTimeLine', function (req, res, next) {

    Timeline.
    find().
    sort('time').
    exec(function (err, aa, count) {
      res.send(aa);
    });

});



module.exports = app;
