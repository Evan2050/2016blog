var express = require('express');
var User = require('../model').User;
var multer  = require('multer');
var upload = multer({ dest: 'public/' });
var auth = require('../auth');


var router = express.Router();  //创建路由中间件的实例

router.get('/signup',auth.checkNotLogin,function (req,res) {
    res.render('user/signup.html',{title:'注册'});
});
router.post('/signup',auth.checkNotLogin,upload.single('avatar'),function (req,res) {
    var user = req.body;
    user.avatar = '/'+req.file.filename;
    User.findOne({username:user.username},function (err,doc) {
        if (err){
            req.session.error = '用户名已注册!';
            res.status(500).send(err);
        }else {
            if (doc){
                req.session.error = '用户名已注册!';
                res.redirect('back');
            }else {
                User.create(user,function (err,doc) {
                    if (err){
                        res.redirect('back');
                    }else {
                        req.session.success = '注册成功，欢迎登陆!';
                        res.redirect('/user/signin');
                    }
                });
            }
        }
    });
});
router.get('/signin',auth.checkNotLogin,function (req,res) {
    res.render('user/signin.html',{title:'登陆'});
});
var util = require('util');
router.post('/signin',auth.checkNotLogin,function (req,res) {
    var user = req.body;
    User.findOne(user,function (err,doc) {
        if (err){
            req.session.error = util.inspect(err);
            res.redirect('back');
        }else {
            if (doc){
                req.session.success = '登陆成功!';
                req.session.user = doc;
                res.redirect('/');
            }else {
                req.session.error = '用户名密码不正确!';
                res.redirect('back');
            }
        }
    });
});
router.get('/signout',auth.checkLogin,function (req,res) {
    req.session.user = null;
    req.session.success = '退出成功!';
    res.redirect('/');
});

module.exports = router;