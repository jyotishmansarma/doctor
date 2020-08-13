var express = require('express');
var userModule=require('../model/appoinment');
var registerModule=require('../model/register');
var adminregisterModule=require('../model/adminregister');
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var router = express.Router();
function checkEmail(req,res,next){
  var email =req.body.email;
 var checkexitEmail= adminregisterModule.findOne({email:email});
 checkexitEmail.exec((err,data)=>{
   if(err) throw err;
   if(data){
   return res.render('adminregister', { title: 'Express' ,msg:'Email already exits'});
   }
  
     next();

 });

}
function checkUserlogin(req,res,next){                 
  var userToken =localStorage.getItem('adminToken');
  try {
    var decoded = jwt.verify(adminToken, 'adminlogintoken');
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
  var useremail =localStorage.getItem('adminemail');
  if(useremail){
    res.redirect('./admindashboard');
  }else{
    res.render('adminlogin', { title: 'Express' ,msg:''});
  }
  });
  router.post('/', function(req, res, next) {
    var email =req.body.email;
    var inputPassword =req.body.inputPassword;
    var checkloginEmail= adminregisterModule.findOne({email:email});
    checkloginEmail.exec((err,data)=>{
      console.log(data);
      if(err) throw err;
      var getadminId =data._id;
      var getpassword =data.password;
      if(bcrypt.compareSync(inputPassword,getpassword)){
        var admintoken = jwt.sign({ adminId: 'getadminId' }, 'adminlogintoken');
        
       localStorage.setItem('adminToken', admintoken);
       localStorage.setItem('adminemail', email);
  
        res.redirect('/admindashboard');
      }else{
        res.render('adminlogin', { title: 'Express' ,msg:'invalid user name or password'});
  
      }
  
      
      
    });
  
  });
  module.exports = router;