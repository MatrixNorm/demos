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

  return data
}
