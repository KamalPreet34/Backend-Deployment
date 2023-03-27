const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    name:String,
    email:String,
    gender:String,
    password:String,
    age: Number,
    city:String,
    is_married:Boolean
},{
    versionKey:false

})
const PostModel=mongoose.model("note",postSchema)
module.exports={
PostModel
}