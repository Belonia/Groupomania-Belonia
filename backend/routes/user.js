const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const user = require("../models/user");

//requetes orientées par les routes
router.get("/",userCtrl.getAllUsers)
router.get("/:id",userCtrl.getOneUser)
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id",userCtrl.updateUser)
router.delete("/:id",userCtrl.deleteUser)

module.exports = router;
