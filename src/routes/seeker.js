const express=require('express')
const router=express.Router()
const seeker=require("../controller/seeker.js")
const mid=require('../middleware/auth.js')

router.post("/signUp",seeker.createUser)
router.post('/login',seeker.login)
router.get("/fetchSeeker/:userId",mid.authentication,seeker.fetchSeeker)

module.exports=router