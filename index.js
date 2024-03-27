const express=require('express')
const mongoose=require('mongoose')
const app=express()
const morgan = require("morgan")
const path = require('path')
const port = 3000
const cors=require("cors")
const dotenv=require ("dotenv")


dotenv.config()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(morgan("dev"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(process.env.mongoDBurl);
  console.log("db connected");
}



const userRoute=require("./routes/userRoute")
app.use("/api",userRoute)

const organizerRoute=require("./routes/organizerRoute")
app.use("/api",organizerRoute)

const adminRoute=require("./routes/adminRoute")
app.use("/api",adminRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })