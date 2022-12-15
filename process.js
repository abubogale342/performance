const PORT = 3331;
const express = require("express");
const sleep = require("./utils/sleep");

const app = express();

const blocking = (req, res) => {
  sleep(10000);
  res.send("blocking");
};

const nonBlocking = (req, res) => {
  res.send("not blocking");
};

app.get("/blocking", blocking);
app.get("/not-blocking", nonBlocking);

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
