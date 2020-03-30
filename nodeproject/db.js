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

//创建模式/原型Schema
var PhotoSchema = new mongoose.Schema({
    name:String,
    path:String
});
//创建模型Model
var Photo = mongoose.model('photo', PhotoSchema);

//创建模式/原型Schema
var ArticleSchema = new mongoose.Schema({
    name:String,
    time:Date,
    summary:String,
    content:String
});
var Article = mongoose.model('article', ArticleSchema);

//创建模式/原型Schema
var EssaySchema = new mongoose.Schema({
    name:String,
    time:Date,
    summary:String,
    content:String,
    path:String
});
var Essay = mongoose.model('essay', EssaySchema);

var ListSchema = new mongoose.Schema({
    title: String, //定义一个属性title，类型为String
    type: String, //定义一个属性type，类型为String
    time: Date, //定义一个属性time，类型为Date
    status: String,
    content: String, //定义一个属性content，类型为String
});
var Timeline = mongoose.model('timeline', ListSchema);

// var articleSchema = new Article({
//     name: "Day12-《了不起的盖茨比》",
//     time: "2020-3-10",
//     summary: "20世纪20年代的美国，空气里弥漫着欢歌与纵饮的气息。一位新晋的神秘富豪盖茨比，经常在家举办奢华派对，一时成为顶级社交圈的焦点。",
//     content:
//         '<article id="900ac9ae-6add-40fe-b9b7-2684ecf40ac1" class="page sans"><header><img class="page-cover-image" src="Untitled%2010/classic-books-ftr.jpg" style="object-position:center 50%"/><h1 class="page-title">《了不起的盖茨比》</h1><table class="properties"><tbody><tr class="property-row property-row-multi_select"><th>Author</th><td><span class="selected-value">弗·司各特·菲茨杰拉德</span></td></tr><tr class="property-row property-row-url"><th>Link</th><td></td></tr><tr class="property-row property-row-select"><th>Score /5</th><td><span class="selected-value">⭐️⭐️⭐️⭐️⭐️</span></td></tr><tr class="property-row property-row-text"><th>Summary</th><td></td></tr><tr class="property-row property-row-multi_select"><th>Type</th><td><span class="selected-value">爵士文学</span><span class="selected-value">美国文学</span></td></tr><tr class="property-row property-row-text"><th>主题</th><td>最喜欢的翻译作品</td></tr><tr class="property-row property-row-number"><th>挑战天数</th><td>12</td></tr></tbody></table></header><div class="page-body"><p id="6a271095-259e-4709-ac17-60b21774d305" class="">#30天推书挑战#</p><h1 id="8e54884d-1b0e-4036-9627-9425aebf205f" class="">Day12-最喜欢的翻译作品</h1><p id="2223807e-d5b6-40c0-8b37-bdec55dbcbbf" class="">《了不起的盖茨比》弗·司各特·菲茨杰拉德</p><hr id="754dd0f2-585e-4de3-ad7c-36cf6b5bb1d0"/><p id="2f22ad08-ab77-4cd1-ba98-100c805f18a8" class="">故事·纸醉金迷</p><p id="3f4fe458-00ba-4b28-9fc8-c2ee178a9b74" class="">20世纪20年代的美国，空气里弥漫着欢歌与纵饮的气息。一位新晋的神秘富豪盖茨比，经常在家举办奢华派对，一时成为顶级社交圈的焦点。</p><p id="be5b684d-6790-4526-8fdf-2108c5ff365b" class="">一个偶然的机会，穷职员尼克闯人了挥金如土的大富翁盖茨比隐秘的世界，惊讶地发现，这位富豪内心惟一的牵绊，竟是自己的表妹，已为人妇的黛西。</p><p id="bf2ff47f-944f-41b1-8f4e-08ab502fc325" class="">盖茨比还是穷小子的时候，曾与黛西许下誓言。如今，他不择手段获得了财富，谋划着一步步重新赢回黛西的爱。</p><p id="83f4ea9c-a31e-4576-9f35-1ff660d82a2f" class="">然而，冰冷的现实容不下飘渺的梦，到头来，盖茨比心中的女神只不过是凡尘俗世的物质女郎。</p><p id="30d379c5-c3fd-487f-be01-2fbffee3728d" class="">当一切真相大白，盖茨比的悲剧人生在残酷的背叛下落下帷幕。</p><p id="ec3d2b1b-d58c-4e91-89b0-0bbd6334b2f2" class="">一阕华丽的“爵士时代”的挽歌，在菲茨杰拉德笔下，如诗如梦，在美国当代文学史上留下了墨色浓重的印痕。</p><p id="57d4b1c2-6f41-4275-96b0-7e3f84388c01" class=""></p><p id="8060085d-cfdf-4c58-95cb-ddf145e6d795" class="">文脉·爵士挽歌</p><p id="5a43ad71-2974-4f8a-94d0-ea1ea9cf23ab" class="">那么问题来了，评论都这样写，但什么是“爵士时代”的挽歌？</p><p id="ddb8fe3b-12d1-4a0f-924d-2eb2304e3d40" class="">江是一个有趣的概念，几乎很少有人真正理解江。一座山上的积雪融化，汇聚成流，能够跨越万里土地，奔流过数个平原，湖泊，分化出密密麻麻的支流，最终汇入大海。而看江的人，能有多少人真正见过它的起源呢。于是，逆流而上旅行雪山，追求江的起源，成为了一种浪漫。</p><p id="2a125474-224e-4946-8a90-871fa1cede9b" class="">文学也是一样，我不是从盖茨比开始看盖茨比的。最先得知这本书的名字，是初中时读《挪威的森林》。在《挪威的森林》中，主角渡边时不时就“拿起《了不起的盖茨比》”读，来打发时间。当时的我不知这本书的来头，甚至没有动过念头去搜索一下。</p><p id="02e73593-44ee-4e02-a6fe-9365ec864975" class="">高中的课堂上，我开始看更多村上春树的小说，在其作品《寻羊冒险记》中，我得知了村上很喜欢雷蒙德钱德勒这位美国作家，并将自己在创作时使用的一种思维方式，称为钱德勒方法。</p><p id="ae149465-5d9f-474e-b281-442330ee4f5c" class="">出于好奇，我买了雷蒙德钱德勒最为出名的作品——《漫长的告别》，来一探究竟。有趣的是，这本书恰有村上春树作序，这篇序言竟写了整整30多页。而我也不可抑制的喜欢上了《漫长的告别》，这是一本近乎完美的小说，也是侦探小说门类下罕有能被称为“经典文学”的作品。钱德勒的写作，有两处特质最为人称道，一是不写心理描写，而从人物行为侧面表现心理活动的“心理黑匣子”；二是惊人华丽的语句，仿佛文字本身在自我表达一般。</p><p id="b1def964-b65c-490b-95a6-df714be36182" class="">就是在村上春树为《漫长的告别》所作的序中，我得知这本书是钱德勒版本的《了不起的盖茨比》。终于在大学的某一天，从陈了厚厚一层灰的书架中取来了这本书。只翻了几页，就被那华丽流畅的辞藻淹没了，这是我在《漫长的告别》中见过的，单看文笔，菲兹杰拉德应该更胜钱德勒一筹。</p><p id="b49de92d-ba08-466c-89dc-4772f880a44a" class="">比起看《挪威的森林》以及《漫长的告别》，看完《了不起的盖茨比》，我并没有得到特别强烈的重要性感受，只是合上书，心满意足的把它放回到架子上。</p><p id="4062df69-fee7-4200-a0ed-857abe1a3e56" class="">因为已经看过其他顶级作家对其领会后写出的精神续作，所以我没有对其中的任何技法所震撼。但，看完《了不起的盖茨比》，我开始能够感受到书与书，作家与作家之间的“Connection”。</p><p id="92d1aa74-460f-4955-bac9-71a3657d4b98" class="">正是《了不起的盖茨比》里，尼克与盖茨比的友情，</p><p id="fb964b70-e7b2-4a26-af93-a9746e8f1495" class="">塑造了《漫长的告别》中马洛与沦落克斯间的友情，</p><p id="7e83e3e3-3033-4f33-bb1e-2ad19b0e63b3" class="">也塑造了《且听风吟》中主人公与鼠的友情。</p><p id="5db0d58c-f730-4e44-bf0b-395bfc7ab775" class="">也正是菲兹杰拉德的华丽文笔，</p><p id="dd10980f-2eb6-4dd2-8fb2-48dd669c4594" class="">成就了雷蒙德钱德勒的华丽文笔，</p><p id="fde5ce24-b223-4e78-974f-af66cf5d45e3" class="">启发了村上春树爽快干净的文笔。</p><p id="cc2ab2a6-6561-41cf-85fa-fcd9e858a0cb" class="">而正如旅行者见过江流，想要溯其源头，</p><p id="80df95a7-c2d4-4ad5-8804-421c70a097f0" class="">读者见过了传承之作，也想要顺着文脉，寻其原点。</p><p id="4e010c3a-6b4f-4d04-92a3-343e3310ca7a" class="">所以要我说，《了不起的盖茨比》不仅是“爵士时代的挽歌”，更是“后爵士时代的国歌”。</p><p id="79383402-0749-46fe-803d-fbdc4e6e7781" class="">现在，来自唐古拉山脉的江水，也继续绵延，直奔大海。</p><p id="40637fd7-a9b6-4aec-a690-e27c110cfb11" class=""></p></div></article>'
// });
// articleSchema.save();
module.exports = {mongoose,Timeline,Photo,Article,Essay};