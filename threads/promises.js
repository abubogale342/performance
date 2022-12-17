const os = require("os");
const { Worker } = require("worker_threads");

const createWorker = () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./threads/counter.js", {
      workerData: { thread_count: os.cpus().length },
    });
    worker.on("message", (data) => resolve(data));
    worker.on("error", (error) => reject(error));
  });
};

module.exports = createWorker;
