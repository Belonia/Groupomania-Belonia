// models/user.js
const mongoose = require("mongoose");

//plugin pour utilisateurs avec adresse unique
const uniqueValidator = require("mongoose-unique-validator");

// modele d'utilisateurs
const userSchema = mongoose.Schema({
  name :{type:String,require:true},
  lastName:{type:String,require:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture :{type:String, default:""},
  bio:{type: String},
  isAdmin:{type:Boolean, require:true, default:false},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserModel", userSchema);
