const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const admin=require("../controller/adminController")




router.get("/unapprovedevents",tryCatchMiddleware(admin.getAllUnApprovedEvents))

router.patch("/approveevent/:id",tryCatchMiddleware(admin.approveAnEvent))
  
router.get("/approvedevents",tryCatchMiddleware(admin.getAllApprovedEvents))


module.exports=router