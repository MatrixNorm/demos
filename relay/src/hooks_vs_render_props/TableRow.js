import React, { useEffect } from 'react'
import { useTickerData, useTimedToggle } from './hooks'
import { StyledTableRow } from './StyledTable'


function TableRow({ ticker }) {
  let { data, didChange } = useTickerData(ticker)
  let [isHighlighted, highlight] = useTimedToggle(500)

  useEffect(() => {
    if (didChange) {
      highlight()
    }
  })

  let change = data.priceChange && (data.priceChange < 0 ? 'down' : 'up')
  
  return (
    <StyledTableRow
      data={data}
      change={isHighlighted && change}
    />
  )
}

export default TableRow