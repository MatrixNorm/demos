

const TICKERS = ['EEM', 'SIL', 'IWM', 'FM', 'EWG', 'UUP', 'COPX', 'WOOD', 'GDX', 'IEI']

function timeoutPromise(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

async function* updatesGenerator() {
  while (true) {
    const ticker = TICKERS[Math.floor(Math.random() * TICKERS.length)]
    await timeoutPromise(1000)
    yield { ticker, price: 100 + 20 * Math.random(), yield: 4}
  }
}

export async function updatesLoop(observer) {
  for await (let update of updatesGenerator()) {
    observer(update)
  }
}

