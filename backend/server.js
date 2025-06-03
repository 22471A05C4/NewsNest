const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')
dotenv.config()
const app=express()
const multer=require('multer')
const port=process.env.PORT||5000
const mongourl=process.env.MongoUrl
const authRoute = require('./Routes/authRoutes')
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/auth',authRoute)
try{
    mongoose.connect(mongourl)
    console.log("Mongodb connected")
}
catch(err){
    console.log("mongodb Error connection",err)
}
app.listen(port,()=>{
    console.log(`server connected to http://localhost:${port}`)
})