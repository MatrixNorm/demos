import React, { useState, useEffect } from 'react'
import { updatesLoop } from './dataSource'

export const DataContext = React.createContext()

export function useMarketData() {
  console.log(2222)

  const [data, setData] = useState({})

  useEffect(() => {
    console.log(3333)
    updatesLoop(handleDataUpdate)
  }, [])

  function handleDataUpdate(update) {
    setData(prevData => {
      return {...prevData, [update.ticker]: update}
    })
  }
    
  // let ids = Object.keys(data)
  // setTimeout(() => {
  //   let len = ids.length
  //   let id = ids[Math.min(Math.floor(Math.random() * len), len-1)]
  //   setData(updateData(data, id, makePrice(data[id].price)))
  // },  2000 + Math.random() * 3000)

  return data
}

// export function updateData(data, id, price) {
//   data = { ...data }
//   data[id] = {
//     id,
//     price,
//     yield: price > 0 ? (5 / price * 100) : 0,
//   }
//   return data
// }

// export function makePrice(price) {
//   let multiplier = Math.min(1.25, Math.pow(72/price, 4))
//   return Math.max(0,
//     price +
//     multiplier*(
//       Math.random() -
//       (price-49)/100 +
//       (price > 95
//         ? 0.01
//         : -Math.pow(multiplier, 3)
//       ) +
//       (price > 0 && Math.random() > price/101 ? (Math.random()-0.5) * 10 : 0)
//     )
//   )
// }

// export function initializeData() {
//   const data = {}
//   for (let r of rowGenerator(10)) {
//     data[r.id] = r
//   }
//   return data
// }

// function* rowGenerator(n) {
//   for (let i = 0; i < n; i += 1) {
//     let id = Math.random().toString(36).substring(7)
//     let price = 83 + Math.random() * 18
//     let yield_ = price > 0 ? (5 / price * 100) : 0
//     yield { id, price, yield: yield_ };
//   }
// }

// function dataUpdateProcess(data) {
//   let updateIn = Math.random() * 2000  
//   setTimeout(() => {
//     let len = ids.length
//     let id = ids[Math.min(Math.floor(Math.random() * len), len-1)]
//     setData(updateData(data, id, makePrice(data[id].price)))
//   }, updateIn)
// }
