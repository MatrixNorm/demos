import React, { useState } from 'react'
import { StyledTable } from './StyledTable'
import TableRow from './TableRow'
import { DataContext, initializeData, makePrice, updateData } from './utils'


export default function App() {
  let [data, setData] = useState(initializeData)
  let ids = Object.keys(data)
  let updateIn = Math.random() * 2000
  
  setTimeout(() => {
    let len = ids.length
    let id = ids[Math.min(Math.floor(Math.random() * len), len-1)]
    setData(updateData(data, id, makePrice(data[id].price)))
  }, updateIn)

  return (
    <DataContext.Provider value={data}>
      <StyledTable>
        {ids.map(id =>
          <TableRow key={id} id={id} />
        )}
      </StyledTable>
    </DataContext.Provider>
  )
}
