const Post = require("../models/post");
const UserModel =require("../models/user")
const ObjectId = require("mongoose").Types.ObjectId;

const fs = require("fs");

//creation de post
exports.createPost =  (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.auth.userId
  })
  post.save()
    .then(() => res.status(201).json({ message: 'post créé !' }))
    .catch(error => res.status(400).json({ error }));
};
//recuperation d'un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        message:error.message,
      });
    });
};
//modification d'un post 
exports.modifyPost = (req, res, next) => {
 const updatedRecord ={ text:req.body.text}

Post.findByIdAndUpdate(
  req.params.id,
  {$set:updatedRecord},
  {new:true},
  (err,docs)=>{
    if (!err)res.send(docs)
    else console.log("Update error :"+ err);
  }
)
}
//suppression de post
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(403).json({ message: "Not authorized" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Post supprimé !" });
            })
            .catch((error) => res.status(400).json({message : error.message }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({message : error.message });
    });
};
//recuperation de tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.find((err,docs)=>{
    if (!err)res.send(docs)
    else console.log("error to get data:" + err)
  }).sort({createdAt:-1})
 
};

//ajout de likes et dislikes

exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      // like si userId n'est pas dans [usersLiked] et que req.body.like == 1
      if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          },
          { _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Liked !" }))
          .catch((error) => res.status(400).json({message: error.message }));
      }

      //  dislike si userId n'est pas dans [usersDisliked] et que req.body.like == -1
      if (
        !post.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          },
          { _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Disliked!" }))
          .catch((error) => res.status(400).json({ message:error.message }));
      }

      // Suppression du like si userId est dans [usersLiked] et que req.body.like == 0
      if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: -1 },
            $pull: { usersLiked: req.body.userId },
          },
          { _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Like removed !" }))
          .catch((error) => res.status(400).json({ message:error.message }));
      }

      // Suppression du dislike si userId est dans [usersDisliked] et que req.body.like == 0
      if (
        post.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
       Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: -1 },
            $pull: { usersDisliked: req.body.userId },
          },
          { _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Dislike removed !" }))
          .catch((error) => res.status(400).json({ message:error.message }));
      }
    })
    .catch(() => res.status(400).json({ message: "Post non trouvé !" }));
};

exports.commentPost=(req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)
  try{
    return Post.findByIdAndUpdate(
      req.params.id, 
      {
        $push: {
          comments:{
            commenterId:req.params.commenterId,
            commenterName :req.params.commenterName,
            commenterLastName:req.params.commenterLastName,
            text:req.body.text,
            timestamps: new Date().getTime()
          }
        }
      },
      {new:true},
      (err,docs)=>{
        if(!err)return res.send(docs);
        else return res.status(400).send(err)
      }
      )
  }catch(err){
    return res.status(400).send(err)
  }
}
exports.editCommentPost=(req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)
  try{
    return Post.findById(req.params.id,(err,docs)=>{
      const thisComment=docs.comments.find((comment)=>
      comment._id.equals(req.body.commentId)
      )
      if(!thisComment)return res.status(404).send("Comment not found")
      thisComment.text=req.body.text;
      
      return docs.save((err)=>{
        if (!err)return res.status(200).send(docs);
        return res.status(500).send(err)
      })
    })
  } catch(err){
    return res.status(400).send(err)
  }
}

exports.deleteCommentPost=(req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)
  try {
    return Post.findByIdAndUpdate(req.params.id,
      {
        $pull :{
          comments:{
          _id:req.body.commentId,
        }
      }
      },
      {new :true},
      (err,docs)=>{
        if (!err) return res.send(docs)
        else return res.status(400).send(err)
      }
      )
  }catch (err){
    return res.status(400).send(err)
  }
}
