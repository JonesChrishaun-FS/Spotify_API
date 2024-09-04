import React from "react";

const Login = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/spot/v1/login";
  };

  return (
    <div>
      <h3>Login to Spotify</h3>
      <button onClick={handleLogin}>Login with Spotify</button>;
    </div>
  );
};

export default Login;
