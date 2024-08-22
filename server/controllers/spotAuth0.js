const { SPOT_CLIENT_ID, SPOT_CLIENT_SECRET, REDIRECT_URI } = process.env;
passport = require("passport");
const axios = require("axios");

const redirect_uri = REDIRECT_URI;

const jwt = async (req, res, next) => {
  passport.authenticate("spotify", (err, data, info) => {
    if (err) {
      return next(err);
    }
    if (!data) {
      return res.redirect("/");
    }

    res.redirect("/?token=" + data.token);
  })(req, res, next);
};
const auth = () => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    return axios({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${SPOT_CLIENT_ID} : ${SPOT_CLIENT_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    }).catch((error) => {
      return false;
    });
  }
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

module.exports = {
  login,
  auth,
  jwt,
};
