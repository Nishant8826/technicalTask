const express=require('express')
const router=express.Router()
const jobSeeker=require("../controller/jobSeeker.js")
const mid=require('../middleware/auth.js')

router.post("/signUp",jobSeeker.createUser)
router.post('/login',jobSeeker.login)
router.get("/fetchSeeker",mid.authentication,jobSeeker.fetchSeeker)

module.exports=router