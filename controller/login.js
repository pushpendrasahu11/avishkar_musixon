const express = require('express');
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const cookieparser=require('cookie-parser')
const app = express()
const jwt_key='kjbdjcdbsjcnsddcndjnc@132324'
// app.listen(3000);
app.use(express.json());
app.use(cookieparser());
const bcrypt=require('bcrypt');
const usermodel=require('../model/connection')
const emailval=require('email-validator')
app.use(express.static('C:/Users/rahul/OneDrive/Desktop/Practice/project/view'));
app.use(bodyParser.urlencoded({ extended: true }))



const loginuser=express.Router();
app.use('/login',loginuser)

loginuser
.route('/')
.get(getlogin)
.post(logindata)


// const temp=express.Router();
// app.use('/temp',temp);

// temp
// .route('/')
// .post(gettemp)

// function gettemp(req,res){
//     console.log('hello this is temp')
//     res.send('hello this is temp')

// }


app.get('/temp',(req,res)=>{
    res.send('hello this is temp');
})

// const musicroute=require('./music')
// app.use('/music',musicroute);

// musicroute
// .route('/a')



function getlogin(req,res){
    res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/login.html')
}

async function logindata(req,res){
    const {email,password}=req.body;
    const data=await usermodel.findOne({email:email});

    if(email){
        const emailcheck=emailchecker(email);
        if(emailcheck){
            console.log(data.password)
            console.log(req.body.password)
    const check=bcrypt.compare(password,data.password,(err,result)=>{
     if(err){
         res.send(err);
     }
     if(result){
         let u_id=data['_id'];
        let token=jwt.sign({payload:u_id},jwt_key);
        // console.log(token)
        // res.cookie('login',token,{maxAge:90000,secure:true,httpOnly:true});
        // res.redirect('/music/a');
        // res.redirect('/temp')/
        // res.redirect('/user')
        // res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/succesfull.html')
        // res.send("hello you have been login successful")
        res.redirect('/temp')
     }
     else{
        res.send("Password is wrong.Please enter the correct password.");
     }
    })
    }
    else{
        res.send("Please enter a valid email");
    }
}
else{
    res.send("Please enter email address");
}


}

// app.get('/mus',(req,res)=>{
//     console.log('hello')
//     res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/project/view/succesfull.html')
// })
function emailchecker(email){
    return emailval.validate(email);
  }

module.exports=loginuser;

