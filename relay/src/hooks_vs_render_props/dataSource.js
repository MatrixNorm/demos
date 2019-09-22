
function* updatesGen(tickers) {
  while (true) {
    const ticker = tickers[Math.floor(Math.random() * tickers.length)]
    yield {
      [ticker]: { ticker, price: 100 + 40 * Math.random(), yield: 4 + Math.random()}
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
      yield* updatesGen(tickers)
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