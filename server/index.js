const path = require("path");
const express = require("express");
const app = express();
const port = 3001;
// const db = require("./database.js");
const cors = require('cors');
const apiRouter = require('../routes/api');
const secretKey = require('crypto').randomBytes(64).toString('hex');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: oneDay } // set to true if https
}));

app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", apiRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../../frontend/src", "index.js"));
// });

app.use(express.static(path.resolve(__dirname, "../../frontend/src")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});