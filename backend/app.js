//import express
const express = require("express");

const mongoose = require("mongoose");
const path = require("path");

const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

require("dotenv").config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;

mongoose .connect(
    `mongodb+srv://${username}:${password}@clustergroupomania.xsio2x1.mongodb.net/${db_name}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée!"));

const app = express();

//Middleware de express qui analyse req.body
app.use(express.json());
// qui peut acceder a l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
