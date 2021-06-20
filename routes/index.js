const express=require('express')
const router=express.Router()
const story=require('../models/storyModel')
const {ensureAuthenticated,ensureGuest}=require('../middleware/authMiddleware')
//@desc   Login/landingpage
//@route type=Get
router.get('/',ensureGuest,(req,res)=>{
    res.render('login',{
        layout: 'login'
    })
})
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    try {
      const stories = await story.find({ user: req.user.id }).lean()
      res.render('dashboard', {
        name: req.user.givenName,
        stories,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })
module.exports=router