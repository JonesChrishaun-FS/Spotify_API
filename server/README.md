# Project Overview

This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web-api) to perform a global search for Artists, Album, and Tracks. It contains both frontend and backend structure that keeps tracks of the web tokens.

# Prerequisites

- MongoDB >= v6
- NodeJS >= v18.3.1
- npm >= v10.8.2
- Brew >= v4.3.9 (if MacOS)
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions

# Getting Started

In order to setup the project we will need to setup our `.env` file by using the `.env.dist` and renaming to `.env`. Place all of your environment variables inside, then save. After you have done so install all of your `node_modules` using the following command.

```
npm install

or

npm i
```

After npm has finished installing all of your node_modules you can now run the project. You will need to open two different terminals. One for the frontend app and one for backend Express application.

### To Run Express (backend)

```
npm run dev
```

# Links

- http://localhost:8000 - Link to the backend (Express) API.
