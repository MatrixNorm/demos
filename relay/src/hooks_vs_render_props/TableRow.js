import React, { useState } from 'react'
import { useTickerData } from './hooks'
import { StyledTableRow } from './StyledTable'


function TableRow({ ticker }) {
  let { data, didChange } = useTickerData(ticker)
  let [isHighlighted, setIsHighlighted] = useState(false)

  if ( !isHighlighted && didChange ) { setIsHighlighted(true) }
  if ( isHighlighted && !didChange ) { setIsHighlighted(false) }

  let change = data.priceChange && (data.priceChange < 0 ? 'down' : 'up')

  return (
    <StyledTableRow
      data={data}
      change={isHighlighted && change}
    />
  )
}

export default TableRow