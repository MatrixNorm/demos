import React from 'react'
import { StyledTable } from './StyledTable'
import TableRow from './TableRow'
import { DataContext, useMarketData } from './utils'


export default function App() {
  const data = useMarketData()
  console.log('App')
  return (
    <DataContext.Provider value={data}>
      <StyledTable>
        {Object.keys(data).map(ticker =>
          <TableRow key={ticker} ticker={ticker} />
        )}
      </StyledTable>
    </DataContext.Provider>
  )
}
