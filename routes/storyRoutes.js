const express=require('express')
const router=express.Router()
const story=require('../models/storyModel')
const {ensureAuthenticated}=require('../middleware/authMiddleware')
//* @desc to add the story  type=GET
router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('stories/add')
})
router.post('/',ensureAuthenticated,async(req,res)=>{
    try{
        req.body.user = req.user.id;
        await story.create(req.body)
        res.redirect('/dashboard')

    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }
})
module.exports = router