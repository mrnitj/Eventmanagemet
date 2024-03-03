const mongoose=require("mongoose")



const registrationSchema=new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    },
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }],
    numberOfTickets: {
        type: Number,
        default: 1, 
        
        },
    
    
    


})

const registration=mongoose.model('registration',registrationSchema)

module.exports=registration