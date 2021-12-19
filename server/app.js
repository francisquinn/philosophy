const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const topicRoutes = require("./routes/topicRoutes");

require("dotenv").config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(process.env.PORT))
  .catch((error) => console.log("error: " + error));

app.get("/api", (req, res) => {
  res.send("Philosophy server");
});

app.use("/api/topics", topicRoutes);
