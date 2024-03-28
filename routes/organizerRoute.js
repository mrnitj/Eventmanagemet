express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const organizer=require("../controller/organizerController")
const upload = require('../middlewares/multerMiddleware')

 
router.post("/postevent/:id",upload.single("image"),tryCatchMiddleware(organizer.addAnEvent))

router.get("/getallevents/:id",tryCatchMiddleware(organizer.getAlleventByOrganizer))



module.exports=router