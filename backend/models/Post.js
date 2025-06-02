// const mongoose=require('mongoose')

// const postSchema=new mongoose.Schema({
//     name:String,
        
   
//    permanentAddress:String,
//     filePath:String,
// });


// module.exports=mongoose.model('Post',postSchema)
const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    heading:String,
        
   
   newscontent:String,
   category:String,
    filePath:String,
});


module.exports=mongoose.model('Post',postSchema)