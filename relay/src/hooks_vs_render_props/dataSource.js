function* updatesGen(initialData) {
  const initData = { ...initialData };
  const data = { ...initialData };
  const tickers = Object.keys(data);

  while (true) {
    const ticker = tickers[Math.floor(Math.random() * tickers.length)];
    const initRecord = initData[ticker];
    const prevRecord = data[ticker];
    const price = prevRecord.price + Math.random() - 0.5;
    const priceChange = price - initRecord.price;
    const nextRecord = {
      ticker,
      price,
      priceChange,
      priceChangePercent: 100 * (priceChange / initRecord.price),
      yield: prevRecord.yield + 0.2 * priceChange
    };
    data[ticker] = nextRecord;
    yield {
      [ticker]: nextRecord
    };
  }
}

export function subscribeToMarketData(tickers, onUpdate) {
  const initialData = Object.fromEntries(
    tickers.map(t => [
      t,
      {
        ticker: t,
        price: 100 + 50 * (Math.random() - 0.7),
        yield: 5 * Math.random() + Math.random()
      }
    ])
  );

  const updates = (function*() {
    yield initialData;
    while (true) {
      yield* updatesGen(initialData);
    }
  })();

  return asyncLoop(
    function() {
      onUpdate(updates.next().value);
    },
    (function*() {
      while (true) {
        yield 2000 + 3000 * Math.random();
      }
    })()
  );
}

function asyncLoop(onNext, deltaT = null) {
  if (!deltaT) {
    deltaT = (function*() {
      while (true) {
        yield 1000;
      }
    })();
  }

  let timeoutId = null;

  const loop = () => {
    let waitFor = deltaT.next().value;
    timeoutId = setTimeout(() => {
      onNext();
      loop(onNext, deltaT);
    }, waitFor);
  };

  const start = () => loop();
  const stop = () => clearTimeout(timeoutId);

  return { start, stop };
}
