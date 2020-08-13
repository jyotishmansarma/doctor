var express = require('express');
var userModule=require('../model/appoinment');
var registerModule=require('../model/register');
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();
function checkEmail(req,res,next){
  var email =req.body.email;
 var checkexitEmail= registerModule.findOne({email:email});
 checkexitEmail.exec((err,data)=>{
   if(err) throw err;
   if(data){
   return res.render('register', { title: 'Express' ,msg:'Email already exits'});
   }
  
     next();

 });

}
function checkUserlogin(req,res,next){                 
  var userToken =localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'logintoken');
  } catch(err) {
    res.redirect('/adminlogin');
  }
  next();
}
/* GET home page. */
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
router.get('/', function(req, res, next) {
    res.render('admindashboard', { title: 'Express' ,});
  });
  module.exports = router;