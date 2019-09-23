import React from 'react'
import { Table, TableRow }  from './Table'
import { DataContext, useMarketData } from './hooks'


export default function App() {
  const data = useMarketData()
  console.log(data)
  return (
    <DataContext.Provider value={data}>
      <Table>
        {Object.keys(data.all).map(ticker =>
          <TableRow key={ticker} ticker={ticker} />
        )}
      </Table>
    </DataContext.Provider>
  )
}
