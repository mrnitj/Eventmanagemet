const mongoose=require("mongoose")



const organizerSchema=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    


})

const organizer=mongoose.model('organizer',organizerSchema)

module.exports=organizer