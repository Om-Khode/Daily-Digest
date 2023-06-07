const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

connectToMongo();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
