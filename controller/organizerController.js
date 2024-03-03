const eventModel=require("../model/eventSchema")






module.exports={
    addAnEvent:async(req,res)=>{
        const event=new eventModel({...req.body}) //provide the id of organizer from frontEnd itself.
        await event.save()

        return res.status(201).json({
            message:"event created successfully,wait for approve"
        })
    }
}