function sleep(miliseconds) {
  let currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}

class Channel {
  constructor() {
    this._q = [];
    this._deferred = null;
  }
  put(item) {
    if (this._deferred === null) {
      this._q[0] = item;
    } else {
      this._deferred.resolve(item);
      this._deferred = null;
    }
  }
  async take() {
    if (this._q.length === 0) {
      this._deferred = {};
      return new Promise(resolve => {
        this._deferred.resolve = resolve;
      });
    } else {
      let item = this._q[0];
      this._q = [];
      return Promise.resolve(item);
    }
  }
}

async function* producer(chan) {
  for (;;) {
    let item = await chan.take();
    yield item;
  }
}

async function* map(fn, input) {
  for await (let x of input) {
    yield fn(x)
  }
}

async function consume(input) {
  function foo(moveEvent) {
    return [moveEvent.clientX, moveEvent.clientY]
  }
  for await (let x of map(foo, input)) {
    console.log(x);
    //sleep(2000);
  }
}

const chan = new Channel();
document.body.addEventListener("mousemove", e => {
  console.log("move");
  chan.put(e);
});
consume(producer(chan));
