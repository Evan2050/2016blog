var express = require('express');
var Article = require('../model').Article;
var auth = require('../auth');
var router = express.Router();  //创建路由中间件的实例

router.get('/add',auth.checkLogin,function (req,res) {
    res.render('article/add.html',{title:'添加文章'});
});
router.post('/add',auth.checkLogin,function (req,res) {
    var article = req.body;
    article.user = req.session.user._id;
    article.createAt = Date.now();
    Article.create(article,function (err,doc) {
        if (err){
            req.session.error = inspect(err);
            res.redirect('back');
        }else {
            req.session.success = "恭喜您，发表成功";
            res.redirect('/');
        }
    })
});
router.get('/detail/:_id',function (req,res) {
    Article.findById(req.params._id,function (err,article) {
        res.render('article/detail',{title:'文章详情',article})
    })
});
router.get('/delete/:_id',auth.checkLogin,function (req,res) {
    Article.findById(req.params._id,function (err,article) {
        if (article.user == req.session._id){
            Article.remove({_id:req.params._id},function (err) {
                if (err){
                    req.session.error = inspect(err);
                    res.redirect('back');
                }else {
                    req.session.success = '删除成功';
                    res.redirect('/');
                }
            })
        }else {
            req.session.error = '这不是你的文章，你无权删除';
            res.redirect('back');
        }
    });

});


module.exports = router;