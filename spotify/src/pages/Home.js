import React from "react";

const Home = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Spotify</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Home;
