const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
    content:{
        type: String,
        required: true,
    },
    blog:{
      type:Schema.Types.ObjectId,
        ref:'blog'
    },
    createBy:{
        type:Schema.Types.ObjectId,
        ref:'user' 
      }
},{timestamps:true});

const Comment = model("Comment", commentSchema);

module.exports = Comment;

