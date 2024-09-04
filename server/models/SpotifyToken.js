const mongoose = require("mongoose");

const SpotifyToken = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  access_token: { type: String },
  token_type: { type: String },
  expires_in: { type: Date },
  refresh_token: { type: String },
});

module.exports = mongoose.model("Token", SpotifyToken);
