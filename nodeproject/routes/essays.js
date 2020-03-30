var { mongoose, Timeline, Photo, Article, Essay } = require('../db');
var path = require('path');
var fs = require('fs');
// GET '/' 首页
exports.list = function (req, res) {
    //查找数据库中的所有图片数据，并渲染首页index.ejs
    Essay.find(function (err, essays) {
        if (err) {
            return next(err);
        }
        res.render('index', {
            title: '文章一览',
            essays: essays
        });
    });
};

//GET '/upload' 图片上传页
exports.form = function (req, res) {
    res.render('essay', {
        title: '文章上传'
    });
};

//POST '/upload' 响应图片上传
exports.submit = function (dir) {

    return function (req, res, next) {
        var img = req.files['imgfile'][0];//获取图片上传后multer封装好的对象
        var originHtml = req.files['htmlfile'][0];//获取图片上传后multer封装好的对象
        var name = req.body.name;
        var summary = req.body.summary;
        let root = path.join(__dirname, '../public/essayimages/');
        const rs = fs.createReadStream(root + originHtml.filename);

        let arr = [];
        rs.on('data', function (chunk) {  //chunk是buffer类型
            arr.push(chunk);
        })
        //监听文件读取完毕，会自动触发一次end事件，没有读取完是不会触发的
        //Buffer.concat合并小buffer
        rs.on('end', function (chunk) {
            let htmlStr = Buffer.concat(arr).toString();
            let start = htmlStr.indexOf("<article");
            let end = htmlStr.indexOf("</article>");
            htmlStr = htmlStr.slice(start,end+10);

            //console.log(data);
            Essay.create({
                name: name,
                time: new Date().toUTCString(),
                summary: summary,
                content: htmlStr,
                path: img.originalname
            }, function (err) {
                if (err) {
                    return next(err);
                }
                //保存成功后跳转到首页
                //res.redirect('/upload');
                console.log("储存一条文章信息成功！")
            });
        })
        // 监听错误
        rs.on('error', function (err) {
            console.log(err);
        })
        //把上传的图片信息保存到数据库
        // Essay.create({
        //     name: name,
        //     time: new Date().toUTCString(),
        //     summary: "",
        //     content: "",
        //     path: img.originalname
        // }, function (err) {
        //     if (err) {
        //         return next(err);
        //     }
        //     //保存成功后跳转到首页
        //     res.redirect('/');
        // });
    };
};

//GET /essay/:id/view 点击图片，查看单张图片
exports.view = function (dir) {

    return function (req, res, next) {
        //通过id查找所需图片
        var id = req.params.id;
        Essay.findById(id, function (err, essay) {
            if (err) {
                return next(err);
            }

            var options = {
                root: dir
            }
            console.log("path", essay.path)
            console.log("dir", dir)
            res.sendFile(essay.path, options);
        });
    };
};

//GET /essay/:id/download 下载图片
exports.download = function (dir) {

    return function (req, res, next) {
        //通过id查找所需图片
        var id = req.params.id;
        Essay.findById(id, function (err, essay) {
            if (err) {
                return next(err);
            }
            var imgdown = path.join(dir, essay.path);
            res.download(imgdown);
        });
    };
};