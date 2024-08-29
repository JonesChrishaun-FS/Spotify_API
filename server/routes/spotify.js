const express = require("express");
const spot = express.Router();
const spotCtrl = require("../controllers/spotAuth0");

spot.get("/login", spotCtrl.login);
spot.get("/authO", spotCtrl.jwt, spotCtrl.authO);
spot.get("/token", spotCtrl.jwt, spotCtrl.status);
spot.get("/status", spotCtrl.jwt, spotCtrl.status);

module.exports = spot;
