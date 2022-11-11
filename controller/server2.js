// const express = require('express');
// // const usermodel=require('./model');
// const mongoose=require('mongoose')
// const jwt=require('jsonwebtoken')
// // const cookiesparser=require('cookie-parser')
// // const path =require('path');
// // const { nextTick } = require('process');
// // const { rootCertificates } = require('tls');
// const app = express()
// app.listen(3000);
// app.use(express.json());









// // const mongoose =require('mongoose');
// const emailval=require('email-validator')
// const bcrypt=require('bcrypt');

// mongoose.connect('mongodb+srv://rahulgarg:rahul94631@cluster0.kklcb25.mongodb.net/?retryWrites=true&w=majority')
// .then(function(db){
//   // console.log("db is connected");
//   // console.log(db);
// })
// .catch(function(err){
//   console.log(err);
// })


// const userschema =mongoose.Schema(
//   {
//     name:{
//       type:String,
//       required:'true',
//       unique:'true'
//     },
//     email:{
//       type:String,
//       required:'true',
//       unique:'true',
//       validate:function(){
//         return emailval.validate(this.email)
//       }
//     },
//     password:{
//       type:String,
//       required:'true'
//     }
    
//   })



//   userschema.pre('save',function(){
//     console.log('before savind',this);
//   })
// //   userschema.post('save',function(doc){
// //     console.log('after savind',doc);
// //   })


// // userschema.pre('save',async function(){
// //     let salt=await bcrypt.genSalt();
// //     let hash=await bcrypt.hash(this.password,salt);
// //     this.password=hash;
// //     // console.log(salt+' '+hash);
// // })
//   const usermodel=mongoose.model('usermodel',userschema);

//  (async function createuser(){
//   try {
//     // let user={
//     //   name:'jatingarg',
//     //   email:'rg356403@gmail.com',
//     //   password:'hello'
//     // };
    
//     // let data=await usermodel.create(user);
//     // for(let i=0;i<13;i++){

//     //     let data=await usermodel.findOneAndDelete({email:'rg356403@gmail.com'});
//     // }
//   } catch (error) {
//     console.log('hello');
//   }
   

    
//     // console.log(data);
//   })();
  

//   // module.export=usermodel;




















// // app.use(cookiesparser());
// // 
// // app.get('/', function (req, res) {
   
// //   res.sendFile(__dirname+'/'+'./views/signup.html');
 
// // });
// // app.get('/about', function (req, res) {
   
// //   res.sendFile(__dirname+'/'+'./views/about.html');
  
// // });
// // app.get('/help', function (req, res) {
   
// //   res.sendFile(__dirname+'/'+'./views/help.html');
  
// // });

// // app.use(function(req,res){
// // res.status(404).sendFile(__dirname+'/'+'./views/index.html');
// // });


// // let users={};
// // app.get('/user');
// // app.post('/user');
// // app.patch('/user');


// // params and query----------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// // app.get('/user/:id/:name',(req,res)=>{
// //   console.log(req.params.id);
// //   console.log(req.params.name);
// //   console.log(req.params);
// //   console.log(req.query);
// //   res.json({
// //     mess:"url done"
// //   });
// // })
// // app.get('/usersa',(req,res)=>{
// //   console.log(req.query);
// //   res.send("hello");
// // });
// // app.post('/usersa',(req,res)=>{
// //   users=req.query.name;
// //   res.json({
// //     names:"hello"
// //   })

// //   console.log(users);
// // })


// // ------------------------------------------------------------------------------------------------->>>>>>



// // functions like mounting---------------------------------------->>>>>>>>>>>>>>



// let users=[
//   {
//     id:'1',
//     name:"rahul garg"
//   },
//   {
//     id:'2',
//     name:"pushpendra"
//   },
//   {
//     id:'3',
//     name:"yash"
//   }
// ]


// const userrouter=express.Router();
// const authrouter=express.Router();
//  app.use('/user',userrouter);
// app.use('/auth',authrouter);
//  userrouter
//  .route('/')
//  .get(protect,getuser)
//  .patch(patchuser)
//  .post(postuser)
//  .delete(deletes)


// //  userrouter
// // .route('/getcookies')
// // .get(getcookies)


// // userrouter
// // .route('/setcookies')
// // .get(setcookies)



// authrouter
// .route('/')
// .post(loginuser)
// // authrouter
// // .route('/')
// // .get(getauthuser)
// // .post(postauthuser)


// // function getauthuser(req,res){
// //   res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/back/views/index.html')
// //   // res.send("hello");
// // }
// // function postauthuser(req,res){
// //  let data=req.body.email;
// //  console.log(data);
// //  res.json({
// //    mess:"user signed up"
// //   });

// // }
// async function getuser(req,res){
//   //  let allusers=await usermodel.findOne({name:'jatingarg'});
// let allusers=await usermodel.find();
//   res.json({
//     data:allusers
//   });
//   };

// let flag=false;
//   function protect(req,res,next){
//     if(flag){
//       next();
//     }
//     else{
//       return res.json({
//         mess:'no allowed'
//       })
//     }
//   }

// async function postuser(req,res){
//   let dta=req.body;
//   let user=await usermodel.create(dta);
//     console.log(req.body);
//     // let y="";
//     // for(key in req.body){
//     //   users[key]=req.body[key];
     
//     // }
   
    
//      res.json({
//     mess:"hellp",
//     usersa:user
//    });
//   }

//   function patchuser(req,res){
//     // console.log("req->body->",req.body);
//     // console.log(req.body.id);
//     // console.log(users[req.body.id] );
//     // users[req.body.id].name=req.body.id;
//     // console.log(users[req.body.id] );

//     res.json({
//       mess:"this is patch",
//       name:users
//     });
//     // console.log(user);
//     }
//  function deletes(req,res){
//   try {
//     let usersasa= usermodel.findOneandDelete({name:'jatingarg'},function(err,doc){
//       if(err) console.log(err)
//       else console.log(doc)
//     })
//   res.json({
//     deleter:'deleted succesfully',
//     data:usersasa
//   });
//   } catch (error) {
//     console.log(error)
//     res.send('done')
//   }
  
// }
// function getcookies(req,res){
// //   res.send('hello')
// // console.log(req.getcookies)
// let cookies=req.cookies;
// console.log(cookies);
// res.send('hello')
// }
// function setcookies(req,res){
// // res.setHeader('Set-Cookie','isloggedin=true')
// res.cookie('isloggedin',false,{maxAge:1000*60*1222,secure:true,httpOnly:true});
// res.send('cookies has been set')
// }

//  let jwtkey="dubsjndjsdsd";

// async function loginuser(req,res){
//   let data =req.body;
//   let usersa=await usermodel.findOne({email:"rg356403@gmail.com"});
//   if(usersa){
//     if(usersa.password==data.password){
//       let uid=usersa['_id'];
//       let jwts=jwt.sign({payload:uid},jwtkey);
//       console.log(jwts);
//        res.json({
//         mess:"founded"
//       })
//     }
//     else{
//        res.json({
//         mess:"not founded"
//       })
//     }
//   }
//   else{
//     res.send('no user exist')
//   }
// }