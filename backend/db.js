const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const mongooseURL = process.env.CONNECTION_STRING;

const connectToMongo = () => {
  mongoose.connect(mongooseURL);
  mongoose.connection.on("connected", () => {
    console.log("Connected to mongo successfully!");
  });
  mongoose.connection.on("error", (err) => {
    console.log("Error:", err);
  });
};

module.exports = connectToMongo;
