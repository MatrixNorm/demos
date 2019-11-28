
const log = console.log

function* fib({a0 = 1, a1 = 1, stop = 10} = {}) {
  yield [0, a0]
  yield [1, a1]
  let [a_n_1, a_n_2, i] = [a0, a1, 2]
  while (true) {
    let a_n = a_n_1 + a_n_2
    yield [i, a_n]
    if ( stop && i > stop) {
      return
    }
    [a_n_1, a_n_2, i] = [a_n, a_n_1, i+1]
  }
}

function* delegatingDemo() {
  yield 99
  yield* fib()
  yield 333
}

// for (let x of delegatingDemo()) {
//   log(x)
// }

function asyncLoop_v0(onNext, deltaT = 1000) {

  let timeoutId = null

  const loop = () => {
    timeoutId =
      setTimeout(() => {
        onNext()
        loop(onNext, deltaT)
      }, deltaT)
  }

  const start = () => loop()
  const stop = () => clearTimeout(timeoutId)
  
  return { start, stop }
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

let x = fib({stop: false})
window.zzz = asyncLoop(() => console.log(x.next().value))
