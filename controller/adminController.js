const eventModel=require("../model/eventSchema")



module.exports={
    getAllUnApprovedEvents:async(req,res)=>{
        const unApprovredEvents=await eventModel.find({isApproved:false})
        res.status(200).json({
            message:"success",
            data:unApprovredEvents
        })
    }
}