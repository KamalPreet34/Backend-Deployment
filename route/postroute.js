const express=require("express")

const postRoute=express.Router()
const {PostModel}=require("../model/postmodel")
const jwt=require("jsonwebtoken")
//get
postRoute.get("/",async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const note=await PostModel.find({"userID":decoded.userID})
            res.status(200).send(note)
        }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRoute.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const note=new PostModel(payload)
        await note.save()
        res.status(200).send({"msg":"note created"})

    }catch(err){
        res.send("something went wrong")
        console.log(err)
    }

})
//patch
postRoute.patch("/update/:userid",async(req,res)=>{
    const userid=req.params.userid
    const payload=req.body
    try{
        const query=await PostModel.findByIdAndUpdate({_id:userid},payload)
        res.status(200).send({"msg":"note update"})

    }catch(err){
        res.status(400).send("error")
    }
})
//delete
postRoute.delete("/delete/:userid",async(req,res)=>{
    const userid=req.params.userid
   
    try{
        const query=await PostModel.findByIdAndDelete({_id:userid})
        res.status(200).send({"msg":"note delete"})

    }catch(err){
        res.status(400).send("error")
    }
})




module.exports={
    postRoute
}