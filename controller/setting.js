const express=require('express');
const {usermodel}=require('../model/connection')



const changename=express.Router();
changename.post('/',async (req,res)=>{
    console.log(req.body)
    let namechangeemail=req.body.oldemail;
    let changedname=req.body.newname;
    await usermodel.findByIdAndUpdate({email:namechangeemail},{name:changedname});

})
module.exports={changename};