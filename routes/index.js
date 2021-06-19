const express=require('express')
const router=express.Router()
//@desc   Login/landingpage
//@route type=Get
router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
module.exports=router