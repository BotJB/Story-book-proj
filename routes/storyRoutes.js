const express=require('express')
const router=express.Router()
const storyModel=require('../models/storyModel')
const {ensureAuthenticated}=require('../middleware/authMiddleware')
const { findOne } = require('../models/storyModel')
//* @desc to add the story  type=GET
router.get('/add',ensureAuthenticated,(req,res)=>{
    res.render('stories/add')
})
router.post('/',ensureAuthenticated,async(req,res)=>{
    try{
        req.body.user = req.user.id;
        await storyModel.create(req.body)
        res.redirect('/dashboard')

    }
    catch(err){
        console.error(err)
        res.render('error/500')
    }
})
router.get('/',ensureAuthenticated,async(req,res)=>{
try{
const stories=await storyModel.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean()
res.render('stories/index',{
    stories,
})
}
catch(err){
    console.log(err)
}
})
router.get('/edit/:id',ensureAuthenticated,async(req,res)=>{
const story=await storyModel.findOne({
    _id:req.params.id,
}).lean()
if(!story){
    res.render('/error/404')
}
if(story.user !=req.user.id){
    res.redirect('/stories')
}
else{
    res.render('stories/edit',{
        story,
    })
}
})
router.put('/:id', ensureAuthenticated, async (req, res) => {
    try {
      let story = await storyModel.findById(req.params.id).lean()
  
      if (!story) {
        return res.render('error/404')
      }
  
      if (story.user != req.user.id) {
        res.redirect('/stories')
      } else {
        story = await storyModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
  
        res.redirect('/dashboard')
      }
    } catch (err) {
      console.error(err)
      return res.render('error/500')
    }
  })
  router.delete('/:id',ensureAuthenticated,async(req,res)=>{
try{
    
    let story = await storyModel.findOne({_id: req.params.id})
    if(!story){
        res.redirect('error/404')

    }
    else{
        await storyModel.findByIdAndDelete(req.params.id)
        res.redirect('/dashboard')
    }
    

}
catch(err){
    console.error(err)
    return res.render('error/500')
}
  })
module.exports = router