const express = require("express");
const spotify = express.Router;
const spotifyCtrl = require("../controllers/spotAuth0");

spotify.get("/login", spotifyCtrl.login);
spotify.get("/auth", spotifyCtrl.jwt, spotifyCtrl.auth);
