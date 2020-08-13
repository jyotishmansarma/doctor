const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/doctor', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
    firstname: {type:String, 
        required: true,
                
        },
    lastname: {type:String, 
        required: true,
                
            },

	email: {
        type:String, 
        required: true,
        index: {
            unique: true, 
        },},
    password: {
        type:String, 
        required: true
    },
    date:{
        type: Date, 
        default: Date.now }
});

var adminregisterModel = mongoose.model('adminregister', userSchema);
module.exports=adminregisterModel;