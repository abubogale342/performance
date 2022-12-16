const os = require("os");
const { workerData, parentPort } = require("worker_threads");

const CORES = os.cpus().length;

let counter = 0;
for (let i = 0; i < 5_000_000_000; i++) {
  counter++;
}

parentPort.postMessage(counter);
