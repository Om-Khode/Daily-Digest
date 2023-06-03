const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = 5000;

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/news", require("./routes/news"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
