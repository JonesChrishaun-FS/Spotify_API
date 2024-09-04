const SPOT_CLIENT_ID = process.env.SPOT_CLIENT_ID;
const SPOT_CLIENT_SECRET = process.env.SPOT_CLIENT_SECRET;
const { Token } = require("../models/SpotifyToken");
const axios = require("axios");
const timestamp = new Date().getTime();

redirect_uri = process.env.REDIRECT_URI;

const getToken = async (code, grant_type, token) => {
  const data =
    grant_type === "refresh_token"
      ? querystring.stringify({ refresh_token: code, grant_type })
      : querystring.stringify({ code, grant_type, redirect_uri });

  return axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data,
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(SPOT_CLIENT_ID + ":" + SPOT_CLIENT_SECRET).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(({ data }) => {
      data.expires_in = new Date().getTime() + data.expires_in;
      token.update(data);
      return token.save();
    })
    .catch((error) => {
      return false;
    });
};

const jwt = async (req, res, next) => {
  req.token = await Token.find();
  if (!req.token && !req.query.code) {
    return next();
  }
  if (!req.token && !req.query.code) {
    req.token = await getToken(
      req.query.code,
      "authorization_code",
      Token.create({})
    );
  } else if (timestamp > req.token.expires_in) {
    req.token = await getToken(
      req.token.refresh_token,
      "refresh_token",
      req.token
    );
  }
  if (!req.toke) {
    res.json({ error: "Could not be requested..." });
  }
  return next();
};

const authO = async (req, res) => {
  if (req.token) {
    return res.redirect(process.env.PORT);
  } else {
    return res.redirect(`${process.env.PORT}/login`);
  }
};

const status = async (req, res) => {
  const valid = req.token && req.token.expires_in > now ? true : false;
  res.json({ valid });
};

const login = async (req, res) => {
  const state = randomstring.generate(16);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: SPOT_CLIENT_ID,
        redirect_uri,
        state,
      })
  );
};

const search = async (req, res) => {
  const query = req.query.q;
  const type = req.query.type || "track"; // Default to searching tracks

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const user = req.user;
    const accessToken = user.access_token;

    const response = await axios.get("/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: type,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error("Error searching Spotify:", err);
    res.status(500).json({ message: "Failed to search Spotify" });
  }
};
module.exports = {
  login,
  status,
  jwt,
  authO,
  search,
};
