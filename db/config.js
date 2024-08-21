const mongoose = require("mongoose");

const DATABASE_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    mongoose.connect(DATABASE_URL);
    const db = mongoose.connection;
    db.once("open", () => console.log("Database Connection Established"));
  } catch (error) {
    db.on("error", (error) => console.error(error));
  }
};

module.exports = connectDB;
