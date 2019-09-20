import React from 'react'

export const DataContext = React.createContext()

export function updateData(data, id, price) {
  data = { ...data }
  data[id] = {
    id,
    price,
    yield: price > 0 ? (5 / price * 100) : 0,
  }
  return data
}

export function makePrice(price) {
  let multiplier = Math.min(1.25, Math.pow(72/price, 4))
  return Math.max(0,
    price +
    multiplier*(
      Math.random() -
      (price-49)/100 +
      (price > 95
        ? 0.01
        : -Math.pow(multiplier, 3)
      ) +
      (price > 0 && Math.random() > price/101 ? (Math.random()-0.5) * 10 : 0)
    )
  )
}

export function initializeData() {
  const data = {}
  for (let r of rowGenerator(10)) {
    data[r.id] = r
  }
  return data
}

function* rowGenerator(n) {
  for (let i = 0; i < n; i += 1) {
    let id = Math.random().toString(36).substring(7)
    let price = 83 + Math.random() * 18
    let yield_ = price > 0 ? (5 / price * 100) : 0
    yield { id, price, yield: yield_ };
  }
}

// function dataUpdateProcess(data) {
//   let updateIn = Math.random() * 2000  
//   setTimeout(() => {
//     let len = ids.length
//     let id = ids[Math.min(Math.floor(Math.random() * len), len-1)]
//     setData(updateData(data, id, makePrice(data[id].price)))
//   }, updateIn)
// }

const data = initializeData()
const observersRegister = []

function subscribeToDataChange(observer) {
  observersRegister.push(observer)
  return () => {
    // TODO unsubscribe function
  }
}

function update(newData) {
  data = newData
  for (let observer of observersRegister) {
    observer(newData)
  }
}