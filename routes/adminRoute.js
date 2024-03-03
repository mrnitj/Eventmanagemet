const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const admin=require("../controller/adminController")




router.get("/unapprovedevents",tryCatchMiddleware(admin.getAllUnApprovedEvents))





module.exports=router