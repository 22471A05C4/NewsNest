// const express=require('express')
// const mongoose=require('mongoose')
// const dotenv=require('dotenv')
// const path = require('path')
// const cors=require('cors')
// const cookieParser=require('cookie-parser')
// dotenv.config()
// const app=express()
// const multer=require('multer')
// const port=process.env.PORT||5000
// const mongourl=process.env.MongoUrl
// const authRoute = require('./Routes/authRoutes')
// const postRoute=require("./Routes/postroute")

// //middleware
// app.use(express.json())
// app.use(cookieParser())
// // app.use(cors())

// app.use('/auth',authRoute)
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use('/Uploads', express.static(path.join(__dirname, 'uploads')));

// mongoose.connect("mongodb+srv://bhargavi:root@news.vfdnnap.mongodb.net/?retryWrites=true&w=majority&appName=news")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));

// app.use("/api/auth/posts", postRoute);
// //app.use('/post',postRoute)
// //app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// //app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// try{
//     mongoose.connect(mongourl)
//     console.log("Mongodb connected")
// }
// catch(err){
//     console.log("mongodb Error connection",err)
// }
// app.listen(port,()=>{
//     console.log(`server connected to http://localhost:${port}`)
// })



const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongourl = process.env.MongoUrl;

// Importing Routes
const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/postroute');

// Middleware (IMPORTANT: Order matters!)
app.use(cors({
  origin: [
    "https://news-nest-seven.vercel.app",
    "https://news-nest-git-main-bhargavis-projects-01f6be1c.vercel.app/",
    "http://localhost:5173",
    "http://localhost:5000"
  ],
  credentials: true
})); // allow frontend to access
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' folder
app.use('/Uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoute);
app.use("/auth/posts", postRoute);
app.get("/", (req, res) => {
  res.send("✅ News backend is live on Railway!");
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://bhargavi:root@news.vfdnnap.mongodb.net/?retryWrites=true&w=majority&appName=news")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
