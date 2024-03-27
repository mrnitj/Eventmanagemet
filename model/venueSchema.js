const mongoose=require("mongoose")



const venueSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    place:{
        type:String,
         // required:true
    },
    maximumSeats:{
        type:Number,
        // required:true
    },
    images:{
        type:Array
    },
    Facilities:{
        type:String
    },
    price: {
        type:Number
    },
    available:{
        type:Boolean,
        default:true
    }
})

const venue = mongoose.model("venue", venueSchema);

module.exports = venue;