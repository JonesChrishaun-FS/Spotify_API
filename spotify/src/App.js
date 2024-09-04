import "./App.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token =
      urlParams.get("token") || localStorage.getItem("spotifyToken");

    if (token) {
      setToken(token);
      localStorage.setItem("spotifyToken", token);
    }
  }, []);
  return <Home>{token ? <SearchBar token={token} /> : <Login />}</Home>;
}

export default App;
