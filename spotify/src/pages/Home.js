import React from "react";

const Home = ({ children }) => {
  const header = {
    backgroundColor: "#1db954",
    color: "#ffff",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const main = {
    backgroundColor: "#181818",
    color: "#ffff",
    minHeight: "100vh",
    alignItems: "center",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };
  return (
    <div>
      <header style={header}>
        <h1>Spotify</h1>
      </header>
      <main style={main}>{children}</main>
    </div>
  );
};

export default Home;
