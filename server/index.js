const path = require("path");
const express = require("express");
const app = express();
const port = 3001;
const db = require("./database.js");

app.use(express.static(path.resolve(__dirname, "../../frontend/build")));

app.use("/api/*", require("../routes/api"));

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

// app.get("/users", (req, res) => {
//   const q = "SELECT * FROM users"
//   db.query(q, (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       return res.json({data})
//     }
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
