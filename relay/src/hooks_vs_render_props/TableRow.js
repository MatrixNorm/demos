import React, { useEffect } from 'react'
import { useData, useDidChange, useLastValue, useTimedToggle } from './hooks'
import { StyledTableRow } from './StyledTable'


function TableRow({ id }) {
  let data = useData(id)
  let last = useLastValue(data)
  let didChange = useDidChange(data)
  let [isHighlighted, highlight] = useTimedToggle(500)

  useEffect(() => {
    if (didChange) {
      highlight()
    }
  })
  
  let change = last && (last.price > data.price ? 'down' : 'up')
  
  return (
    <StyledTableRow
      data={data}
      change={isHighlighted && change}
    />
  )
}

export default TableRow