const mongoose=require('mongoose')
const connectDB=()=>{
const mongo_url=process.env.MONGO_URI
try{
    mongoose.connect(mongo_url)
    console.log(`mongodb connected to string ${mongo_url}`)//we get url in the terminal
}
catch{
     console.log('mongodb connection failed')
}
}
module.exports=connectDB