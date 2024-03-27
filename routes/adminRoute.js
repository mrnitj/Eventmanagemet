const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const admin=require("../controller/adminController")
const upload = require("../middlewares/multerMiddleware")


router.post("/createvenue", upload.array("images",5),tryCatchMiddleware(admin.createVenue))

router.get("/getallvenues",tryCatchMiddleware(admin.getAllVenue))

router.get("/unapprovedevents",tryCatchMiddleware(admin.getAllUnApprovedEvents))

router.patch("/approveevent/:id",tryCatchMiddleware(admin.approveAnEvent))
  
router.get("/approvedevents",tryCatchMiddleware(admin.getAllApprovedEvents))


module.exports=router