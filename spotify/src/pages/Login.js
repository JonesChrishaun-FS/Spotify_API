import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/spot/v1/login";
  };

  const button = {
    padding: "10px 20px",
    backgroundColor: "#1db954",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
  };
  const text = {
    marginTop: "150px",
  };
  return (
    <div style={text}>
      <h2>Login To Spotify</h2>
      <button onClick={handleLogin} style={button}>
        Login With Spotify
      </button>
    </div>
  );
};

export default Login;
