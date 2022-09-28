const express=require('express')
const router=express.Router()
const job=require('../controller/job.js')

router.post("/createJob",job.createJob)


module.exports=router

