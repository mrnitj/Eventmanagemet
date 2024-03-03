const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const user=require("../controller/userController")




router.post("/commonregister",user.commonRegister)



module.exports=router