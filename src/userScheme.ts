import mongoose from "mongoose";

interface User{
    UserName:string,
    passWord:string,
    isAdmin:Boolean,
    place:string,
    image?:string
}
 const userSchema= new mongoose.Schema<User>({
    UserName:{type:String,required:true},
    passWord:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    place:{type:String,required:true},
    image:{type:String}
})

export const UserModel=mongoose.model<User>('UserModel',userSchema)