const express=require('express')
const router=express.Router();
const {posts,news}=require('../Controllers/PostControllers')

router.post('/posts',posts)
router.get('/news',news)

module.exports=router;