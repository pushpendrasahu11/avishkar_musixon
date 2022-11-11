const express = require('express');
const app = express()
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt');
const emailval=require('email-validator')
const usermodel=require('../model/connection');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.static('C:/Users/rahul/OneDrive/Desktop/Practice/project/view'));
// app.use(express.static('C:/Users/rahul/OneDrive/Desktop/Practice/project/controller/main.js'));
app.use(bodyParser.urlencoded({ extended: true }))
const sendemail=require('./nodemailer');
app.listen(3000);
const jwt_key='kjbdjcdbsjcnsddcndjnc@132324'
app.use(cookieParser());
const path=require('path')

// app.get('/main.js',function(req,res){
//     res.sendFile(path.join(__dirname,'./main.js')); 
    
// });
// userorute----
const userrouter=express.Router();
app.use('/user',userrouter)
userrouter
.route('/')
.get(getsignup)
.post(postuser)




// otproute---
const otproute=express.Router();
app.use('/otp',otproute)
otproute
.route('/')
.get(getotp)
.post(postotp)



function getotp(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/otp.html')
}

function postotp(req,res){
   if(req.body.otp==value){
    res.redirect('/login')
   }
}







const loginuser=express.Router();
app.use('/login',loginuser)
loginuser
.route('/')
.get(getlogin)
.post(logindata)





const temps=express.Router();
app.use('/main',temps)
temps
.route('/')
.get(protect,gettemp)



function protect(req,res,next){
    
    // console.log(req.cookies)
   const obj=req.cookies;
 

    if(Object.keys(obj).length === 0){
  res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/main.html')
    }
    
    else{
        usermodel.deleteMany({email:"jcbdj@gmail.com"});
            next();
    }
}
function gettemp(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/main.html')
}





function getlogin(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/login.html')
}

async function logindata(req,res){
    const {email,password}=req.body;
    const data=await usermodel.findOne({email:email});
    const emailcheck=emailchecker(email);
    if(emailcheck){
    if(data){
    const check=bcrypt.compare(password,data.password,(err,result)=>{
     if(err){
         res.send(err);
         res.redirect('/login')
     }
     if(result){
         let u_id=data['_id'];
       var token=jwt.sign({payload:u_id},jwt_key);
        res.cookie('login',token,{maxAge:90000,secure:true,httpOnly:true});
        res.redirect('/main')
     }
     else{
        res.status(401).send("Password is wrong.Please enter the correct password.");
     }
    })
    
}
else{
    res.status(401).send("Please Enter a Valid user details for login");
}
    }
    else{
        res.send("Please Enter a valid Email address")
    }
}

function getsignup(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/signup.html');
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
        sendemail();
        res.redirect('/otp');
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