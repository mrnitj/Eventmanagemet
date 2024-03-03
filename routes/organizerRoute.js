express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const organizer=require("../controller/organizerController")

 
router.post("/postevent",tryCatchMiddleware(organizer.addAnEvent))

router.get("/getallevents/:id",tryCatchMiddleware(organizer.getAlleventByOrganizer))



module.exports=router