const express = require('express');
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const app = express()
const bcrypt=require('bcrypt');
const emailval=require('email-validator')
const usermodel=require('../model/connection')
app.listen(3000);
app.use(express.json());
app.use(express.static('C:/Users/rahul/OneDrive/Desktop/Practice/project/view'));
app.use(bodyParser.urlencoded({ extended: true }))
const userrouter=express.Router();
app.use('/user',userrouter)
userrouter
.route('/')
.get(getsignup)
.post(postuser)
const loginuser=require('./login');
app.use('/login',loginuser)
loginuser
.route('/')
function getsignup(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/index.html');
}
 async function postuser(req,res){
    var name = req.body.yourname
    var email = req.body.email;
    var password=req.body.password;
    const confirm_password=req.body.confirm_password;
    if(emailchecker(email)){
    if(confirm_password==password){
        let userdata={name,email,password};
        let userdata_at_db=await usermodel.create(userdata);
        res.redirect('/login');
    }
    else{
        res.status(404).send("confirm password is not matching");
    }
    }
    else{
        res.status(404).send("Enter a valid email address");
    }
    
    
}


function emailchecker(email){
    return emailval.validate(email);
  }
