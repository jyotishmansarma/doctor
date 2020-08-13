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
    res.render('register', { title: 'Express' ,msg:''});
  });
  router.post('/',checkEmail, function(req, res, next) {
    var firstName =req.body.firstName;
    var lasttName =req.body.lasttName; 
    var email =req.body.email;
    var inputPassword =req.body.inputPassword;
    var repeatPassword =req.body.repeatPassword;
    if(inputPassword!= repeatPassword){
      res.render('register', { title: 'Express' ,msg:'Password not matched'});
  
    }else{
      inputPassword =bcrypt.hashSync(req.body.inputPassword,10);
    var registerDetails = new registerModule({
      firstname: firstName,
      lastname :lasttName,
      email :email,
      password:inputPassword
    });
    registerDetails.save((err,doc)=>{
      if(err) throw err;
      res.render('register', { title: 'Express' ,msg:'user register successfully'});
  
    });
  }
    
  });
  module.exports = router;