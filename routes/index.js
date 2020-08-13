var express = require('express');
var userModule=require('../model/appoinment');
var registerModule=require('../model/register');
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var getAppoinment = userModule.find({});
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
  res.render('index', { title: 'Express' ,});
});
router.post('/', function(req, res, next) {
  var name =req.body.name;
  var depertment =req.body.depertment;
  var doctor =req.body.doctor;
  var email =req.body.email;
  var age =req.body.age;
  var phoneno =req.body.phoneno;
  var date=req.body.date;
  var userDetails = new  userModule({
    Name:name,
    Email:email,
    Age:age,
    DoctorName:doctor,
    DpertmentName:depertment,
    phoneNumber:phoneno,
    bookingDate:date,
  });
  userDetails.save((err,doc)=>{
    if(err) throw err;
  
    res.render('index', { title: 'Password management system', });
    
  });

});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'Express' ,});
});

module.exports = router;
