var mongoose = require("mongoose"); //引入mongoose
mongoose.connect('mongodb://localhost:27017/blogDB'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017 

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});


var ListSchema = new mongoose.Schema({
    title: String, //定义一个属性title，类型为String
    type: String, //定义一个属性type，类型为String
    time: Date, //定义一个属性time，类型为Date
    status: String,
    content: String, //定义一个属性content，类型为String
});

var Timeline = mongoose.model('timeline', ListSchema);
// var timeLine = new Timeline({
//     title: "三十天推书挑战！",
//     type: "写作",
//     time: "2020-3-4",
//     status: "ongoing",
//     content:
//         "每天一个新的推荐书的主题，比如\"一本书名中带有季节的书\"，\"一本与成长有关的书\"，是只有对阅读量有自信的人才能玩的挑战诶！"
// });
// timeLine.save();
module.exports = {mongoose,Timeline};