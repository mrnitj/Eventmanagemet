const userModel=require("../model/userSchema")
const organizerModel=require("../model/organizerSchema")
const adminModel=require("../model/adminShema")
const { sendEmailToUser } = require("../utils/sendEmail")
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')


module.exports={
    commonRegister:async(req,res)=>{
        const username=req.body.username
        const email=req.body.email
        const PASSWORD=req.body.password
        const isOrganizer=req.body.isOrganizer
      
        


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

        // if(email==process.env.organizerEmail){
        //      console.log("this is working");
        //     const organizer=await organizerModel.findOne({email:email})

        //     if(!organizer){
        //         console.log(PASSWORD);
        //         const hashedPassword=await bcrypt.hash(PASSWORD,10)
        //         const ORGANIZER=new organizerModel({
        //             email:email,
        //             password:hashedPassword,
        //             username:username
        //         })
        //       await ORGANIZER .save()
        //       return res.status(201).json({
        //         message:"organizer registration successfull",
        //         data:email,
        //       })
        //     }

        //     return res.status(303).json({
        //         message:"organizer already registered please login"
        //     })

        // }
        const atIndex = email.indexOf('@'); 
        const newusername = atIndex !== -1 ? email.slice(0, atIndex) : email;
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100; 
        const password = newusername + randomNumber;
        const hashedPassword=await bcrypt.hash(password,10)

        if(isOrganizer){

            const organizer=await organizerModel.findOne({email:email})
            
                   if(!organizer){
                // console.log(PASSWORD);
                // const hashedPassword=await bcrypt.hash(PASSWORD,10)
                const ORGANIZER=new organizerModel({
                    username:username,
                    email:email,
                    password:hashedPassword
                   
                })
              await ORGANIZER .save()
              console.log("this  is org",ORGANIZER);
              await sendEmailToUser(ORGANIZER,password)

              return res.status(201).json({
                message:"organizer registration successfull",
                data:email,
              })
            }

            return res.status(303).json({
                message:"organizer already registered please login"
            })

        }
         

        const existingUser=await userModel.findOne({email:email})
        if(existingUser){
            return res.status(303).json({
                message:"user already registered please login"
            })
        }
        const USER=new userModel({username:username,email:email,password:hashedPassword})
        const user =await USER.save()
        // console.log(user,"this is user");
        
        if(user){
            await sendEmailToUser(user,password)
            return res.status(201).json({
                message:"user registration successfull,check email for password",
                data:email
            })
        }
        
        


        

    },
    commonlogin:async(req,res)=>{

        const email=req.body.email
        const password=req.body.password
        const isOrganizer=req.body.isOrganizer


        console.log(email,password);
        if(email==process.env.adminEmail){

            const admin=await adminModel.findOne({email:email})
            

            if(admin){
                const comparePassword = await bcrypt.compare(password,admin?.password)
              
                if(comparePassword){
                    const secret = process.env.SECRET_KEY_ADMIN;
                    const token = jwt.sign({
                        userId: admin?._id,
                        
                    },
                        secret, { expiresIn: '72h' }
                    );

                    return res.status(200).json({
                        message:"admin login successfull",
                        data:token,
                        type:"admin"
                    })

                }

                return res.status(403).json({
                  message:"invalid password",
                })
            }
        return    res.status(404).json({
                message:"please  register your email"
            })
            


        }

        // if(email==process.env.organizerEmail){

        //     const organizer=await organizerModel.findOne({email:email})

        //     if(organizer){
        //         const comparePassword = await bcrypt.compare(password,organizer?.password)               
                  
        //             if(comparePassword){
        //                 const secret = process.env.SECRET_KEY_ORGANIZER;
        //                 const token = jwt.sign({
        //                     userId: organizer?._id,
                            
        //                 },
        //                     secret, { expiresIn: '72h' }
        //                 );
    
        //                 return res.status(200).json({
        //                     message:"organizer login successfull",
        //                     data:token
        //                 })
                      
        //             }
    
        //             return res.status(403).json({
        //                 message:"invalid password",
        //               })
                    
        //     }
        //   return   res.status(404).json({
        //         message:"please  register your email"
        //     })
           
            
            
        // }

        if(isOrganizer){
                  const organizer=await organizerModel.findOne({email:email})

            if(organizer){
                const comparePassword = await bcrypt.compare(password,organizer?.password)               
                  
                    if(comparePassword){
                        const secret = process.env.SECRET_KEY_ORGANIZER;
                        const token = jwt.sign({
                            userId: organizer?._id,
                            
                        },
                            secret, { expiresIn: '72h' }
                        );
    
                        return res.status(200).json({
                            message:"organizer login successfull",
                            data:token,
                            Id: organizer?._id,
                            type:"oraganizer"
                        })
                      
                    }
    
                    return res.status(403).json({
                        message:"invalid password",
                      })
                    
            }
          return   res.status(404).json({
                message:"please  register your email"
            })

        }
        const user=await userModel.findOne({email:email})
        // console.log(user,"user");
         
        if(user){
            const comparePassword = await bcrypt.compare(password,user?.password) 
            // console.log("pass",comparePassword);
            if(comparePassword){
                const secret = process.env.SECRET_KEY_USER;
                const token = jwt.sign({
                    userId: user?._id,
                    
                },
                    secret, { expiresIn: '72h' }
                );

                return res.status(200).json({
                    message:"user login successfull",
                    data:token,
                    Id: user?._id,
                    type:"user"
                })

            }
            return res.status(403).json({
                message:"invalid password",
              })
        }
        return   res.status(404).json({
            message:"please  register your account"
        })
       

    },
}