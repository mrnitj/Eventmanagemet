const userModel=require("../model/userSchema")
const organizerModel=require("../model/organizerSchema")
const adminModel=require("../model/adminShema")
const { sendEmailToUser } = require("../utils/sendEmail")
const bcrypt=require("bcrypt")


module.exports={
    commonRegister:async(req,res)=>{
        const username=req.body.username
        const email=req.body.email
        const PASSWORD=req.body.password
        if(email==process.env.adminEmail){

            const admin=await adminModel.findOne({email:email})

            if(!admin){
                const hashedPassword=await bcrypt.hash(PASSWORD,10)
                const ADMIN=new adminModel({
                    email:email,
                    password:hashedPassword,
                    username:username
                })

              await   ADMIN.save()
              return res.status(201).json({
                message:"admin registration successfull",
                data:email,
              })
            }

            return res.status(303).json({
                message:"admin already registered please login"
            })

        }

        if(email==process.env.organizerEmail){

            const organizer=await organizerModel.findOne({email:email})

            if(!organizer){
                const hashedPassword=await bcrypt.hash(PASSWORD,10)
                const ORGANIZER=new organizerModel({
                    email:email,
                    password:hashedPassword,
                    username:username
                })
              await ORGANIZER .save()
              return res.status(201).json({
                message:"organizer registration successfull",
                data:email,
              })
            }

            return res.status(303).json({
                message:"organizer already registered please login"
            })

        }
        const atIndex = email.indexOf('@'); 
        const newusername = atIndex !== -1 ? email.slice(0, atIndex) : email;
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100; 
        const password = newusername + randomNumber;
        const hashedPassword=await bcrypt.hash(password,10)
         

        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.status(303).json({
                message:"user already registered please login"
            })
        }
        const USER=new userModel({username:username,email:email,password:hashedPassword})
        const user =await USER.save()
        
        if(user){
            await sendEmailToUser(user,password)
            return res.status(201).json({
                message:"user registration successfull,check email for password",
                data:email
            })
        }
        
        


        

    },
}