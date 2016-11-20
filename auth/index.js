//判断是否登陆中间件


exports.checkNotLogin = function (req,res,next) {
    if (req.session.user){
        req.session.error = "你已经登陆，无需重复登陆";
        res.redirect('/');
    }else {
        next();
    }
};


exports.checkLogin = function (req,res,next) {
    if (req.session.user){
        next();
    }else {
        req.session.error = "此链接需要登陆,请登录";
        res.redirect('/user/signin');
    }
};