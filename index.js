const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/api/testing", (req, res) => {
  res.send("Hello World!, Ini Ecommerce Sederhana");
});

const RouterVersi1 = require("./Routes/RouterVersi1");
app.use("/api", RouterVersi1);
