const mongoose = require("mongoose");

const mongooseURL = "mongodb://localhost:27017/newsApp";

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
