const mongoose =require('mongoose')
const emailval=require('email-validator')
const userschema=require('./schema')
mongoose.connect('mongodb+srv://Rahulgarg1:rahul94631@cluster0.z1ts96w.mongodb.net/?retryWrites=true&w=majority')
.then(function(db){
  console.log("db is connected");
})
.catch(function(err){
  console.log(err);
})

const usermodel=mongoose.model('usermodel',userschema);

module.exports=usermodel
