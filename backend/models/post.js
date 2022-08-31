// models/post.js
const mongoose = require("mongoose");

//modele de post
const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  text:{type:String, required:true},
  imageUrl: { type: String, required: false},
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  comments:{type:[{commenterId: String, commenterName:String,commenterLastName:String, text:String,timestamp :Number}], 
  required:true,}
},
{
timestamps:true,
}
);

module.exports = mongoose.model("Post", postSchema);
