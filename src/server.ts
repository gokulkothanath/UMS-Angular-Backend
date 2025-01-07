import express, { Request,Response } from "express";
import mongoose from "mongoose";
import cors from "cors"
import { UserModel } from "./userScheme";
import { verify } from "./auth";
require('dotenv').config()

const jwt=require('jsonwebtoken');
const app=express();
app.use(cors());
app.use(express.json())

const mongoUrl=process.env.mongoUrl !
const PORT=process.env.PORT;
const key=process.env.SECRET_KEY;
mongoose.connect(mongoUrl)
.then(()=>{console.log('mongodb Connected');})
.catch((err)=>{console.log(err);});


app.get('/user',verify,async(req:Request,res:Response)=>{

    const users=await UserModel.find({isAdmin:false});
    res.json(users)
})
app.post('/user',async(req:Request,res:Response)=>{
   try{
    const username=req.body.UserName
  const user=  await UserModel.findOne({UserName:username})
    if(user){
        throw ('UserName Exists')
    }
    const newUser= new UserModel(req.body);
    await newUser.save();
    res.status(200).send({message:'SignUp Success please Login'})
   }catch(err:any){
    res.status(500).send({error:err})
   }
})
app.post('/login',async(req:Request,res:Response)=>{
    try{
         const user=await UserModel.findOne({UserName:req.body.UserName,passWord:req.body.passWord})
         if(!user){
            throw ('No Such User')
         }else{
            const payload={userId:user.id,role:user.isAdmin}
            const token=jwt.sign(payload,key,{expiresIn:'1h'})
            res.status(200).send({token:token,name:user.UserName,place:user.place})
         }     
    }catch(err:any){
        res.status(400).send({error:err})
    }
})

app.listen(PORT,()=>{console.log('server started');
})


