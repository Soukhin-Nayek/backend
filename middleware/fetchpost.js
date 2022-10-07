var jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const Post = require("../models/Stories");
const fetchallpost = async (req,res,next)=>{
    const postid = req.header('post-id');
    if(!postid){
        res.status(401).send({error:"Post not found"});
    }
    try{
        const data= await Post.find({_id:postid});
        if(!data)
            res.status(401).send({error:"Please authenticate using a valid post id "});
        req.post=data
        next();
    } catch(error){
        res.status(500).send("please authenticate ausing a valid token ");
    }
}
module.exports=fetchallpost;