const m = {};

function tick(period) {
  let n = 1;
  let intervalId = setInterval(() => {
    console.log("tick ", n);
    n++;
  }, period);
  return () => clearInterval(intervalId);
}

m.createTimeoutPromise = function(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

m.iteratorYieldPromises = function*(period) {
  let n = 0;
  console.log("AAA");
  while (true) {
    console.log("BBB");
    yield m.createTimeoutPromise(period).then(() => n);
    n += 10;
  }
};

m.example1_1 = function() {
  console.log("start");
  let clear = tick(1000);
  const iter = m.iteratorYieldPromises(3000);
  let p1 = iter.next().value.then(console.log);
  let p2 = iter.next().value.then(console.log);
  let p3 = iter.next().value.then(console.log);
  console.log(p1, p2, p3);
  Promise.all([p1, p2, p3]).then(clear);
  console.log("exit");
};

m.asyncNumberGenerator = async function*(period) {
  let n = 0;
  console.log("AAA");
  while (true) {
    console.log("BBB");
    await m.createTimeoutPromise(period);
    console.log("CCC");
    yield n;
    n += 10;
  }
};

m.example2_1 = function() {
  console.log("start");
  let clear = tick(1000);
  const iter = m.asyncNumberGenerator(3000);
  let p1 = iter.next().then(console.log);
  let p2 = iter.next().then(console.log);
  let p3 = iter.next().then(console.log);
  console.log(p1, p2, p3);
  Promise.all([p1, p2, p3]).then(clear);
  console.log("exit");
};

m.asyncGenaratorThatAcceptsAnotherAsyncGenerator = async function*(input) {
  for await (let value of input) {
    yield [value, new Date()];
  }
};

m.example3_1 = function() {
  console.log("start");
  let clear = tick(1000);
  const iter = m.asyncGenaratorThatAcceptsAnotherAsyncGenerator(
    m.asyncNumberGenerator(3000)
  );
  let p1 = iter.next().then(console.log);
  let p2 = iter.next().then(console.log);
  let p3 = iter.next().then(console.log);
  console.log(p1, p2, p3);
  Promise.all([p1, p2, p3]).then(clear);
  console.log("exit");
};

window.DEMO = m;
