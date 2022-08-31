//dans routes/post.js
const express = require("express");
const router = express.Router();

// definition des chemins
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const postCtrl = require("../controllers/post");

//requetes orientées par les routes
router.get("/", auth, postCtrl.getAllPosts);
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.likePost);
router.get("/:id", auth, postCtrl.getOnePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.delete("/:id", auth, postCtrl.deletePost);

//commentaire
router.patch("/:id/comment-post",auth,postCtrl.commentPost);
//editer le commentaire d'un post
router.patch("/:id/edit-comment-post", auth,postCtrl.editCommentPost);
//supprimer  le commentaire d'un post
router.patch("/:id/delete-comment-post",auth,postCtrl.deleteCommentPost)

module.exports = router;
