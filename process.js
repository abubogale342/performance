const PORT = 3331;
const express = require("express");

const sleep = require("./utils/sleep");
const { Worker } = require("worker_threads");
const app = express();

const blocking = (req, res) => {
  sleep(3000);
  res.send("blocking");
};

const nonBlocking = (req, res) => {
  res.send("not blocking");
};

app.get("/blocking", blocking);
app.get("/not-blocking", nonBlocking);
app.get("/counter", (req, res) => {
  const counter = new Worker("./threads/counter");

  counter.on("message", (count) =>
    res.status(200).send(`The result is ${count}`)
  );

  counter.on("error", (msg) => {
    res.status(404).send(`An error occurred: ${msg}`);
  });
});

app.listen(PORT, () => console.log(`Server Listening on port ${PORT} ...`));
