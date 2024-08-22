const express = require("express");
require("dotenv").config();
const connectDB = require("./db/config");

connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
