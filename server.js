var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var app = express();
global.inspect = require('util').inspect;

app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
app.engine('.html',require('ejs').__express);

//静态文件中间件
app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:true}));  //处理post的请求体
var congig = require('./config');
app.use(session({
    secret:'zf',
    cookie:{httpOnly:true},
    resave:true,
    saveUninitialized:true,
    store:new MongoStore({   //指定会话存储位置
        url:congig.dbUrl
    })
}));
app.use(function (req,res,next) {
    res.locals.success = req.session.success;
    res.locals.error = req.session.error;
    res.locals.user = req.session.user;
    req.session.success = req.session.error = null;
    next();
});
app.use('/',index);
app.use('/user',user);   //判断请求的url是否以/user开头，是走user中间件
app.use('/article',article);



app.listen(9090);
