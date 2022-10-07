const express = require("express");
const Likes = require("../models/Likes");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

//**||**\\Route 1 : fatch number of likes and others GET "api/likes/fatchlikes" , login required
router.get('/fetchlikes',fetchuser,async(req,res)=>{
    try{
        const postid = req.header('post-id');
        const likes = await Likes.find({post:postid});
        res.json(likes);
    } catch(error){
        console.log(error);
        res.status(500).send("some error occured");
    }
});

//**||**\\Route 2 : add like or comment or gift POST "api/likes/addlike"
router.post('/addlike',fetchuser ,async(req,res)=>{
    try{
        const postid = req.header('post-id');
        let likes = await Likes.find({post:postid,username:req.user.id});
        if(!likes[0]){
            likes = new Likes({
                username:req.user.id,
                post:postid,
                likes:req.body.likes,
                comments:req.body.comment,
                gift:req.body.gift
            })
            const savelikes =await likes.save();
            res.json(savelikes);
        }
        else {
            if(req.body.likes===true)
                likes = await Likes.findByIdAndUpdate(likes[0].id,{likes:true});
            if(req.body.comment===true)
                likes = await Likes.findByIdAndUpdate(likes[0].id,{comments:req.body.comments});
        }
    } catch(error){
        console.log(error);
        res.status(500).send("some error occured");
    }
});

//**||**\\Route 3 : delete like or comment or gift DELETE "api/likes/deletelikes"
router.delete('/deletelikes',fetchuser ,async(req,res)=>{
    try{
        const postid = req.header('post-id');
        let likes = await Likes.find({post:postid,username:req.user.id});
        if(!likes[0])
        {
            return res.status(401).send("doesn't exists. ");
        }
        if (likes[0].username.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        if(req.body.likes===false)
            likes = await Likes.findByIdAndUpdate(likes[0].id,{likes:false});
        if(req.body.comment===false)
            likes = await Likes.findByIdAndUpdate(likes[0].id,{comments:null});
        res.json(likes);
    } catch(error){
        console.log(error);
        res.status(500).send("some error occured");
    }
});
module.exports = router 
