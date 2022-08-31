// middlewares/auth.js
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  try {
    // divise la chaine en un tableau autour du mot-clé bearer
    // et du token et recuperation du token([1])
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, SECRET_KEY);
    //recuperation de l'userid du token qu'on a décodé
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    
    res.status(401).json({ message: error.message });
  }
};
