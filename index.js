const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./route/userroute")
const {postRoute}=require("./route/postroute")
const {auth}=require("./middleware/middleware")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",userRouter)
app.use(auth)
app.use("/note",postRoute)



app.listen(4500,async()=>{
    try{
        await connection
        console.log("connected to mongo")
    }catch(err){
        console.log(err)
    }
    console.log("server is working")
})