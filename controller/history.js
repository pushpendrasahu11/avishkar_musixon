const express=require('express');
const {usermodel}=require('../model/connection');

const gethistory=express.Router();
gethistory.post('/',async (req,res)=>{
    try {
        if(req.body.email){
        const gethistorydata=await usermodel.findOne({email:req.body.email});
        res.send(gethistorydata.history)
        console.log(gethistorydata.history)
        }
    
    } catch (error) {
       res.render('error',{
        info:"error at gethistorydata"
       }) 
    }
})



const history=express.Router();

history.post('/',async(req,res)=>{
    try{
        const id=req.body.id;
        const historyemail=req.body.useremail;
        const historyuser=await usermodel.findOne({email:historyemail});
        let lens=historyuser.history.length;
        var array_history=historyuser.history;
        array_history.unshift(id);
        if(lens>15){
            array_history.pop();
        }
        await usermodel.findOneAndUpdate({email:historyemail},{history:array_history});
    }
    catch(err){
        res.render('error',{
            info:"error occured at posting song for playlist try after some time"
        })
    }
})



module.exports={gethistory,history};