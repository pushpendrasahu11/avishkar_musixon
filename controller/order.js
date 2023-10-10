const express = require('express');
const Razorpay=require('razorpay');
require('dotenv').config()

// console.log(process.env.key_id)
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });
  const createorderroute=express.Router();
  createorderroute.use(express.json())
  createorderroute.get('/',async (req, res)=>{
  
      try {
          const {amount,currency,receipt, notes} = {amount:'30000',currency:'INR',receipt:'rcp1',notes:'Subscribe'};		
          const order=await instance.orders.create({amount, currency, receipt, notes:{
            id:'123456'
          }});
          console.log(order);
          res.json({order});
      } catch (error) {
          console.log(error)
      }	
  })
module.exports={createorderroute}