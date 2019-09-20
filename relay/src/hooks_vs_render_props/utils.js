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
  let ids = new Array(10)
    .fill()
    .map(() => Math.random().toString(36).substring(7))
  let data = ids.reduce(
    (data, id) => updateData(data, id, 83 + Math.random() * 18),
    {}
  )
  return data
}