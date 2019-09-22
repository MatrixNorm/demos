
function* updatesGen(initialData) {
  const data = {...initialData}
  const tickers = Object.keys(data)
  while (true) {
    const ticker = tickers[Math.floor(Math.random() * tickers.length)]
    const record = data[ticker]
    const priceChange = Math.random()
    const updatedRecord = {
      price: record.price + priceChange,
      yield: record.yield + 0.2 * priceChange,
    }
    data[ticker] = { ticker, ...updatedRecord}
    yield {
      [ticker]: { ticker, ...updatedRecord}
    } 
  }
}

export function subscribeToMarketData(tickers, onUpdate) {
  const initialData = Object.fromEntries(
    tickers.map(t => [t, { ticker: t, 
                           price: 100 + 40 * Math.random(),
                           yield: 5 * Math.random() + Math.random()}]))

  const updates = (function* () {
    yield initialData
    while (true) {
      yield* updatesGen(initialData)
    }
  })()

  return asyncLoop(
    function() {
      onUpdate(updates.next().value)
    },
    (function* () {
      while (true) {
        yield 1000 + 2000 * Math.random()
      }
    })()
  )
}

function asyncLoop(onNext, deltaT = null) {
  if ( !deltaT ) {
    deltaT = (function* () { 
      while (true) {
        yield 1000
      }
    })()
  } 

  let timeoutId = null

  const loop = () => {
    let waitFor = deltaT.next().value
    timeoutId =
      setTimeout(() => {
        onNext()
        loop(onNext, deltaT)
      }, waitFor)
  }

  const start = () => loop()
  const stop = () => clearTimeout(timeoutId)
  
  return { start, stop }
}