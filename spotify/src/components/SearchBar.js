import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ token }) => {
  const [query, setQuery] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) {
      console.log("Query is empty.");
      setError("Please enter a search term.");
      return;
    }

    console.log("Search:", query);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8000/spot/v1/search?q=${query}&type=album,artist,track`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const albumsData = response.data.albums?.items || [];
      const artistsData = response.data.artists?.items || [];
      const tracksData = response.data.tracks?.items || [];

      setAlbums(albumsData);
      setArtists(artistsData);
      setTracks(tracksData);

      if (!albumsData.length && !artistsData.length && !tracksData.length) {
        setError(
          "No results found for albums, artists, or tracks. Please try a different search term."
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError(
        "There was an error fetching the search results. Please try again later."
      );
    }
  };

  const search = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };
  const item = {
    backgroundColor: "#181818",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
  };
  const result_container = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "20px",
  };
  const results = {
    marginTop: "40px",
  };
  const resultsHeading = {
    color: "#1db954",
    marginBottom: "20px",
    textAlign: "center",
  };
  const input = {
    width: "60%",
    padding: "10px",
    marginRight: "10px",
    borderRadius: " 4px",
    border: "1px solid #333",
    backgroundColor: "#333",
    color: "#e0e0e0",
    fontSize: "1rem",
  };
  const button = {
    padding: "10px 20px",
    backgroundColor: "#1db954",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
  };
  return (
    <div>
      <div style={search}>
        <input
          style={input}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for music..."
        />
        <button onClick={handleSearch} style={button}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {albums.length > 0 && (
        <div style={results}>
          <h2 style={resultsHeading}>Albums</h2>
          <div style={result_container}>
            {albums.map((album) => (
              <a
                style={item}
                href={album.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                key={album.id}
              >
                <img src={album.images[0]?.url || ""} alt={album.name} />
                <p>
                  {album.name} by{" "}
                  {album.artists.map((artist) => artist.name).join(", ")}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {artists.length > 0 && (
        <div style={results}>
          <h2 style={resultsHeading}>Artists</h2>
          <div style={result_container}>
            {artists.map((artist) => (
              <a
                style={item}
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                key={artist.id}
              >
                <img src={artist.images[0]?.url || ""} alt={artist.name} />
                <p>{artist.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {tracks.length > 0 && (
        <div style={results}>
          <h2 style={resultsHeading}>Tracks</h2>
          <div style={result_container}>
            {tracks.map((track) => (
              <a
                style={item}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                key={track.id}
              >
                <img src={track.album.images[0]?.url || ""} alt={track.name} />
                <p>
                  {track.name} by{" "}
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
