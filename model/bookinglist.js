const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/doctor", {
  useNewUrlParser: true,
  useCreateIndex: true,
});
var conn = mongoose.Collection;
var bookingSchema = new mongoose.Schema({
  Name: { type: String, required: true },

  Email: { type:String,
     required: true },
  DoctorName: { type:String,
        required: true },
  DpertmentName: { type:String,
            required: true },
  Age: {
    type:String,
    required: true,
  },
  phoneNumber: {
    type:Number,
    required: true,
  },
  bookingDate: {
    type:String,
    required: true,
  },
  date: {
    type:Date,
    default: Date.now,
  },
   

});

var bookingModel = mongoose.model("bookinglist", bookingSchema);
module.exports = bookingModel;
