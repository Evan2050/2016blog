var express = require('express');
var Article = require('../model').Article;
var router = express.Router();  //创建路由中间件的实例

router.get('/',function (req,res) {
    Article.find({}).populate('user').exec(function(err,articles){
        res.render('index.html',{title:'首页',articles})
    })

});



module.exports = router;