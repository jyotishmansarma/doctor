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
    res.redirect('/login');
  }
  next();
}
/* GET home page. */
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
router.get('/', function(req, res, next) {
  var useremail =localStorage.getItem('useremail');
  if(useremail){
    res.redirect('./userdashboard');
  }else{
    res.render('login', { title: 'Express' ,msg:''});
  }
  });
  router.post('/', function(req, res, next) {
    var email =req.body.email;
    var inputPassword =req.body.inputPassword;
    var checkloginEmail= registerModule.findOne({email:email});
    checkloginEmail.exec((err,data)=>{
      if(err) throw err;
      var getuserId =data._id;
      var getpassword =data.password;
      if(bcrypt.compareSync(inputPassword,getpassword)){
        var token = jwt.sign({ userId: 'getuserId' }, 'logintoken');
        
       localStorage.setItem('userToken', token);
       localStorage.setItem('useremail', email);
  
        res.redirect('/userdashboard');
      }else{
        res.render('login', { title: 'Express' ,msg:'invalid user name or password'});
  
      }
  
      
      
    });
  
  });
  module.exports = router;