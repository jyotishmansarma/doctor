var express = require('express');
var userModule=require('../model/appoinment');
var registerModule=require('../model/register');
var bookingModule=require('../model/bookinglist');
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
router.get('/',checkUserlogin, function(req, res, next) {
    var useremail =localStorage.getItem('useremail');
    var NocheckEmail= bookingModule.find({Email:useremail}).count();
    var bookingdate= bookingModule.find({Email:useremail}).sort({"datetime": -1}).limit(1)
   // console.log(NocheckEmail);
   NocheckEmail.exec(function(err,data){
     bookingdate.exec(function(err,doc){
      if(err) throw err;
      console.log(doc.Name);
      res.render('userdashboard', { title: 'Express' ,useremail:useremail,records:data,date:doc});

     })
    
   })
   
  });
  
  module.exports = router;