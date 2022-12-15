const sleep = (time = 1000) => {
  const currentTime = new Date().getTime();

  while (new Date().getTime() < currentTime + time) {}
};

module.exports = sleep;
