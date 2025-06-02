const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const cors=require('cors')
const path=require('path')
const port=process.env.PORT
const userSchema=require('./Models/User')
const multer=require('multer')

const MongoUrl=process.env.MONGo_URI
app.use(express.json())
app.use(cors())
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

try{
     mongoose.connect(MongoUrl)
  console.log(`connected ${MongoUrl}`)
}
catch{
    console.log(err)
}

const storage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const upload=multer({storage})

app.listen(port,()=>{
    console.log("http://localhost:5000")
    
})