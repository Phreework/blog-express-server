var {mongoose,Timeline,Photo,Article} = require('./db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var photos = require('./routes/photos');

var webPath = "http://localhost:3000";
// var testRouter = require('./routes/test');

var app = express();


//配置multer
var multer = require('multer');
var storage = multer.diskStorage({
    //设置图片上传后存放的路径(默认放在系统临时文件夹中)
    destination: function(req,file,cb){
        cb(null,'./public/images');
    },
    //设置图片上传后图片的名称(默认随机给一个名字)
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
var upload = multer({
    storage:storage
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// var ejs = require('ejs');
// app.engine('html', ejs.__express);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/photos', indexRouter);

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
app.get('/searchArticle', function (req, res, next) {

  Article.
  find().
  sort('time').
  exec(function (err, aa, count) {
    res.send(aa);
  });

});
let root =  path.join(__dirname, './public/images');
//图片服务
//首页
app.get('/', photos.list);
//图片上传页
app.get('/upload', photos.form);
//响应图片上传
app.post('/upload', upload.single('file'), photos.submit(root));
//单张图片查看
app.get('/photo/:id/view',photos.view(root));
//图片下载
app.get('/photo/:id/download', photos.download(root));
//图片接口	
app.get('/getImage', function(req, res, next) {
  //建议使用绝对路径查找图片
  Photo.
  find({name:req.query.name}).
  exec(function (err, aa, count) {
    const rs = fs.createReadStream(root + '/' + aa[0].path);
    rs.pipe(res);
  });
	// const rs = fs.createReadStream('../../../image/' + req.params.name);
	// rs.pipe(res);
});
app.get('/getImageUrl', function(req, res, next) {
  //建议使用绝对路径查找图片
  Photo.
  find({name:req.query.name}).
  exec(function (err, aa, count) {
    let url = webPath + "/photo/"+aa[0].id+"/view";
    res.send(url);
  });
	// const rs = fs.createReadStream('../../../image/' + req.params.name);
	// rs.pipe(res);
});
module.exports = app;
