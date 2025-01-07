import { NextFunction, Request, Response } from "express"
const jwt=require('jsonwebtoken')

export const verify=(req:Request,res:Response,next:NextFunction)=>{
      const headers=req.headers['authorization']
      const payload=jwt.decode(headers)
      if(payload.role==true){
            next()
      }else{
            res.status(401).send('User not Authorized')
      }
      
      
}