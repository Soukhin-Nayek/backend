var jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const JWT_SECRET = 'soukhin_mix_mint';

const fetchuser = (req,res,next)=>{
    const success = false;
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token "});
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch(error){
        res.status(500).send("please authenticate ausing a valid token ");
    }
}
module.exports=fetchuser;