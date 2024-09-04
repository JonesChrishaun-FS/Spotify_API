const express = require("express");
require("dotenv").config();
const connectDB = require("./db/config");
const spot = require("./routes/spotify");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/spot/v1", spot);
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
