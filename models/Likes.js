const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikesSchema = new Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    },
    likes:{
        type:Number,
        default:0
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