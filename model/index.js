var mongoose = require('mongoose');
mongoose.Promise = Promise;
var ObjectId = mongoose.Schema.Types.ObjectId;
var congig = require('../config');
mongoose.connect(congig.dbUrl);

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    avatar:String
},{collection:'user'});

var User = mongoose.model('User',userSchema);

var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    createAt:{type:String,default:new Date()},
    user:{type:ObjectId,ref:"User"}
},{collection:'article'});
var Article = mongoose.model('Article',articleSchema);

exports.User = User;
exports.Article = Article;