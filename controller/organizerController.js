const eventModel=require("../model/eventSchema")






module.exports={
    addAnEvent:async(req,res)=>{
        const event=new eventModel({...req.body}) //provide the id of organizer from frontEnd itself.
        await event.save()

        return res.status(201).json({
            message:"event created successfully,wait for approve"
        })
    },
    getAlleventByOrganizer:async(req,res)=>{

        const id=req.params.id

        const jobsByorganizer=await eventModel.find({createdBy:id})

        return res.status(200).json({
            message:"success",
            data:jobsByorganizer
        })

    },
}