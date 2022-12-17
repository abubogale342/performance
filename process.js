const PORT = 3331;
const os = require("os");
const express = require("express");
const createWorker = require("./threads/promises");

const sleep = require("./utils/sleep");
const app = express();

const blocking = (req, res) => {
  sleep(1000);
  res.send("blocking");
};

const nonBlocking = (req, res) => {
  res.send("not blocking");
};

app.get("/blocking", blocking);
app.get("/not-blocking", nonBlocking);
app.get("/counter", async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < os.cpus().length; i++) {
    workerPromises.push(createWorker());
  }

  const thread_results = await Promise.all(workerPromises);

  const totalCount =
    thread_results[0] +
    thread_results[1] +
    thread_results[2] +
    thread_results[3];

  res.send(totalCount.toString());
});

app.listen(PORT, () => console.log(`Server Listening on port ${PORT} ...`));
