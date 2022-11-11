const nodemailer=require('nodemailer');
var transport=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:'rg515139@gmail.com',
        pass:'wmuvsnjonauylcmh'
    }
})

value=otp();
var mailoption={
        from:'rg515139@gmail.com',
        to:'rg356403@gmail.com',
        subject:'otp to signup at musixon',
        text:`hello your otp is ${value}`,
        html:`<h1> Hello This is OTP for Musixon ${value}</h1>`
        
        
    }



function otp(){
var val = Math.floor(1000 + Math.random() * 9000);
console.log(val);
return val;
}


function sendemail(){
    transport.sendMail(mailoption,(err,info)=>{
        if(err){
          console.log(err);
        }
        else{
            console.log(info.response);
        }
    })
}
module.exports=sendemail;