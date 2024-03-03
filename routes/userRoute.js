const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const user=require("../controller/userController")




router.post("/commonregister",tryCatchMiddleware(user.commonRegister))
router.post("/commonlogin",tryCatchMiddleware(user.commonlogin))



module.exports=router