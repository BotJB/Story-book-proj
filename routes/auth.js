const express=require('express')
const router=express.Router()
const passport=require('passport')
//@desc Google authentication page
//@req   type=GET 
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

//@desc Google callback page
//@req   type=GET 
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})
// @desc logout route
//@req type=GET
router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/')
})
module.exports = router