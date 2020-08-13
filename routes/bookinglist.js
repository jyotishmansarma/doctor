var express = require('express');
var userModule=require('../model/appoinment');
var registerModule=require('../model/register');
var bookingModule=require('../model/bookinglist');
var bcrypt =require('bcryptjs');
var jwt = require('jsonwebtoken');
var getAppoinment = userModule.find({});
var router = express.Router();
function checkEmail(req,res,next){
  var email =req.body.email;
 var checkexitEmail= registerModule.findOne({email:email});
// console.log(checkexitEmail);
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
   
    getAppoinment.exec(function(err,data){
      if(err) throw err;
     // console.log(data);
      res.render('bookinglist', { title: 'Express' ,useremail:useremail,records:data,});
      
    });
   
    
  });
  
router.get('/delete/:id',checkUserlogin, function(req, res, next) {
  var useremail =localStorage.getItem('useremail');
  var Id =req.params.id;
  var userId= userModule.findByIdAndDelete(Id );
  console.log(userId);
  userId.exec(function(err,data){
   // console.log(data);
    if(err) throw err;
    res.redirect('/bookinglist');

  })
 
 
  
 
  
});
  
router.post('/',function(req, res, next) {
  var useremail =localStorage.getItem('useremail');
  var name =req.body.Name;
    var depertment =req.body.DpertmentName;
    var doctor =req.body.DoctorName;
    var email =req.body.Email;
    var age =req.body.Age;
    var phoneno =req.body.phoneNumber;
    var date=req.body.bookingDate;
    var id=req.body.id;
    var bookingDetails = new  bookingModule({
      Name:name,
      Email:email,
      Age:age,
      DoctorName:doctor,
      DpertmentName:depertment,
      phoneNumber:phoneno,
      bookingDate:date,
    });
    bookingDetails.save((err,data)=>{
      if(err) throw err;
    
     var userId= userModule.findByIdAndDelete({_id:id});
     //console.log(userId);
     userId.exec(function(err,data){
      if(err) throw err;
      
      res.redirect('/bookinglist');

    
    });
    
      
      
    });
   

    
      //  res.render('bookinglist', { title: 'Express' ,useremail:useremail,records:data,});
      
   
  });

    
  
  module.exports = router;