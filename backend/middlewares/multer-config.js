//middlerwares/multer-config.js
const multer = require("multer");

//formats de fichers acceptés
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//destination du fichier et generer un nom de fichier unique
const storage = multer.diskStorage({
  //destination du stockage du fichier
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    //suppression des espaces dans le nom du fichier
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
