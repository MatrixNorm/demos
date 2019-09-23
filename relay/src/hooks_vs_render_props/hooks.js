import React, { useContext, useState, useEffect } from 'react'
import { subscribeToMarketData } from './dataSource'

export const DataContext = React.createContext()

export function useTickerData(ticker) {
  let data = useContext(DataContext)
  return { data: data.all[ticker], didChange: data.updatedTickers?.includes(ticker)}
}

const TICKERS = [
  'EEM', 'SIL', 'IWM', 'FM', 'EWG', 
  'UUP', 'COPX', 'WOOD', 'GDX', 'IEI']

export function useMarketData() {
  console.log(2222)

  const [data, setData] = useState({all: {}, updatedTickers: []})

  useEffect(() => {
    console.log(3333)
    subscribeToMarketData(TICKERS, handleDataUpdate).start()
  }, [])

  function handleDataUpdate(update) {
    console.log(update)
    setData(prevData => {
      return {
        all: {...prevData.all, ...update},
        updatedTickers: Object.keys(update)
      }
    })
  }

  return data
}
