const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikesSchema = new Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    username:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likes:{
        type:Boolean,
        default:false
    },
    comments:{
        type:String,
        default:null
    },
    gift:{
        type:Number,
        default:0
    }
})

const Likes = mongoose.model('likes',LikesSchema);
module.exports = Likes;