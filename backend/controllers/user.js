const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

const isEmailValid = require('../utils/emailValid');
const { isPasswordValid, validationMessages } = require('../utils/passwordValid');
const { deleteModel } = require("mongoose");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.getAllUsers = async(req,res)=>{
  const users = await UserModel.find().select("-password")
  res.status(200).json(users)
}

exports.getOneUser = (req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)

  UserModel.findById(req.params.id,(err, docs)=>{
if (!err) res.send(docs);
else console.log("ID unknown" + err);
  }).select("-password");
}

exports.signup = (req, res, next) => {
    // Vérification de la validité de l'email
    if (!isEmailValid(req.body.email)) {
      return res.status(400).json({
        message: 'adresse email non valide !'
      });
    }
    // Vérification de la validité du mot de passe
  
    if (!isPasswordValid(req.body.password)) {
      return res.status(400).json({
        message: validationMessages(req.body.password)
      });
    }
  bcrypt  .hash(req.body.password, 10)
    .then((hash) => {
      const user = new UserModel({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      user       .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ message:error.message }));
    })
    .catch((error) => res.status(500).json({ message:error.message }));
};

exports.login = (req, res, next) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable!! " });
      }
      bcrypt    .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(404)
              .json({ message: "Paire login/mot de passe incorrecte" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, SECRET_KEY, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

exports.updateUser = async(req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)
  try {
    await UserModel.findOneAndUpdate(
      {_id:req.params.id},
      {
        $set : {
          bio: req.body.bio
        }
      },
      {new: true, upsert: true,setDefaultsOnInsert:true},
      (err,docs)=>{
        if (!err) return res.send(docs);
        if (err) return res.status(500).send({message:err})
      }
    )
  } catch (err){
    return res.status(500).json({message:err})
  }
};

exports.deleteUser = async (req,res)=>{
  if (!ObjectId.isValid(req.params.id))
  return res.status(400).send("ID unknown :" + req.params.id)
  try {
    await UserModel.remove({ _id :req.params.id}).exec();
    res.status(200).json({message: "Successfully deleted."})  
  }catch (err){
return res.status(500).json({message:err})
  }
}