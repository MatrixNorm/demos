
const TICKERS = ['EEM', 'SIL', 'IWM', 'FM', 'EWG', 'UUP', 'COPX', 'WOOD', 'GDX', 'IEI']

function* updatesGen(tickers) {
  while (true) {
    const ticker = tickers[Math.floor(Math.random() * tickers.length)]
    yield { ticker, price: 100 + 20 * Math.random(), yield: 4}
  }
}

export function subscribeToMarketData(tickers, onUpdate) {
  const initialData = {}
  for (let t in tickers) {
    initialData[t] = 100 + 40 * Math.random()
  }

  const updates = (function* () {
    yield initialData
    while (true) {
      yield* updatesGen(tickers)
    }
  })()

  return asyncLoop(
    function() {
      onUpdate(updates.next())
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