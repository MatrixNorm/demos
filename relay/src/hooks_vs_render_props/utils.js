import React, { useState, useEffect } from 'react'
import { subscribeToMarketData } from './dataSource'

export const DataContext = React.createContext()

const TICKERS = [
  'EEM', 'SIL', 'IWM', 'FM', 'EWG', 
  'UUP', 'COPX', 'WOOD', 'GDX', 'IEI']

export function useMarketData() {
  console.log(2222)

  const [data, setData] = useState(() => {
    console.log(5555)
    return Object.fromEntries(TICKERS.map(t => [t, {ticker: t}]))
  })

  useEffect(() => {
    console.log(3333)
    subscribeToMarketData(TICKERS, handleDataUpdate).start()
  }, [])

  function handleDataUpdate(update) {
    console.log(update)
    setData(prevData => {
      return {...prevData, ...update}
    })
  }

  return data
}
