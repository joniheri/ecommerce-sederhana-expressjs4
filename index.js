const express = require("express");
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/api/testing", (req, res) => {
  res.send("Hello World!, Jon Heri Bootcamp lkasjdj lkajsfdlaksjfd");
});

const RouterVersi1 = require("./Routes/RouterVersi1");
app.use("/api", RouterVersi1);
