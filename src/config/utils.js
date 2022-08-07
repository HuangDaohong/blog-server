const createUUID = () => {
  const INITIAL_COUNTER = 1024;
  let counter = INITIAL_COUNTER;
  let lastTime = 0;
  return () => {
    const now = Date.now();

    if (now === lastTime) {
      counter++;
    } else {
      counter = INITIAL_COUNTER;
      lastTime = now;
    }
    return `${now}${counter}`;
  };
};

// 导出,用的时候是createUUID()()
module.exports = { createUUID };
