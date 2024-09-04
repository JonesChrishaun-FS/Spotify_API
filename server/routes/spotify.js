const express = require("express");
const spot = express.Router();
const spotCtrl = require("../controllers/spotAuth0");

spot.get("/login", spotCtrl.login);
spot.get("/auth", spotCtrl.jwt, spotCtrl.auth);
spot.get("/token", spotCtrl.jwt, spotCtrl.status);
spot.get("/status", spotCtrl.jwt, spotCtrl.status);
spot.get("/search", spotCtrl.jwt, spotCtrl.search);

module.exports = spot;
