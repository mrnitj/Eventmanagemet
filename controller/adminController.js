const eventModel=require("../model/eventSchema")



module.exports={
    getAllUnApprovedEvents:async(req,res)=>{
        const unApprovredEvents=await eventModel.find({isApproved:false}).populate("createdBy")
        res.status(200).json({
            message:"success",
            data:unApprovredEvents
        })
    },
    approveAnEvent:async(req,res)=>{
        const eventId=req.params.id

    
            const updatedEvent = await eventModel.findByIdAndUpdate(
                eventId,
                { isApproved: true },
                { new: true } 
              );
              if (!updatedEvent) {
                return res.status(404).json({ message: 'Event not found' });
              }
              return res.status(200).json(updatedEvent);
        

    },
    getAllApprovedEvents:async(req,res)=>{
        const approvedEvents=await eventModel.find({isApproved:true}).populate("createdBy")
      
        return res.status(200).json({
            message:"success",
            data:approvedEvents
        })
    }
}