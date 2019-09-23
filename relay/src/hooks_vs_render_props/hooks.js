import { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from './utils'

export function useTimedToggle(milliseconds) {
  let [isActive, setActive] = useState(false)
  let timeoutRef = useRef()
  
  function clearActiveTimeout() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
  }
  
  function activate() {
    clearActiveTimeout()
    setActive(true)
    timeoutRef.current = window.setTimeout(() => {
      setActive(false)
    }, milliseconds)
  }
  
  // When the component is unmounted, make sure to clear the timeout. 
  useEffect(() => clearActiveTimeout, [])
  
  return [isActive, activate]
}

export function useTickerData(ticker) {
  let data = useContext(DataContext)
  return { data: data.all[ticker], didChange: data.updatedTickers?.includes(ticker)}
}