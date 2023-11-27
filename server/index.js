const path = require("path");
const express = require("express");
const app = express();
const port = 3001;
const db = require("./database.js");
const cors = require('cors');

app.use(express.static(path.resolve(__dirname, "../../frontend/build")));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use("/api/*", require("../routes/api"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});