const express=require("express")
const router=express.Router()
const tryCatchMiddleware=require("../middlewares/tryCatch")
const user=require("../controller/userController")




router.post("/commonregister",tryCatchMiddleware(user.commonRegister))
router.post("/commonlogin",tryCatchMiddleware(user.commonlogin))
router.get("/getallevents",tryCatchMiddleware(user.getAllEvents))
router.post('/paymentstart',tryCatchMiddleware(user.paymentInit))
router.post('/paymentfinal/:id/:user',tryCatchMiddleware(user.verifyPayment))
router.get('/fetchallbooking',tryCatchMiddleware(user.getAllBookings))



module.exports=router