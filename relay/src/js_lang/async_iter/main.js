const m = {};

m.createTimeoutPromise = function(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

m.example1 = function() {
  const asyncIter = m.asyncNaturalNumberIterator();
  asyncIter.next().then(console.log);
  asyncIter.next().then(console.log);
  asyncIter.next().then(console.log);
  asyncIter.next().then(console.log);
  asyncIter.next().then(console.log);
  console.log("The End");
};

m.example2 = function() {
  const syncIter = m.syncNaturalNumberIterator();
  console.log(syncIter.next());
  console.log(syncIter.next());
  console.log(syncIter.next());
  console.log(syncIter.next());
  console.log(syncIter.next());
  console.log("The End");
};

m.example3 = async function() {
  for await (const number of m.asyncNaturalNumberIterator()) {
    console.log(number);
    if (number > 4) break;
  }
};

m.asyncNaturalNumberIterator = async function*() {
  let n = 0;
  console.log("AAA");
  while (true) {
    console.log("BBB");
    await m.createTimeoutPromise(3000);
    console.log("CCC");
    yield n;
    n++;
  }
};

m.syncNaturalNumberIterator = function*() {
  let n = 0;
  console.log("AAA");
  while (true) {
    console.log("BBB");
    yield n;
    n++;
  }
};

window.DEMO = m;
