import { useState, useMemo } from 'react'
import Papa from 'papaparse'
import UploadCSV from '../components/UploadCSV'
import SummaryCards from '../components/SummaryCards'
import OrdersTable from '../components/OrdersTable'
import ChartsArea from '../components/ChartsArea'

export default function Home() {
  const [data, setData] = useState([])

  const handleParsed = (rows) => {
    // expect rows as array of objects
    setData(rows.map((r, i) => ({ id: i+1, ...r })))
  }

  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold text-sky-600">Sunhub</div>
        <UploadCSV onParsed={handleParsed} />
      </header>

      <main>
        <SummaryCards data={data} />
        <ChartsArea data={data} />
        <OrdersTable data={data} />
      </main>

      <footer className="mt-10 text-sm text-gray-500">
        Built for Sunhub — CSV upload demo
      </footer>
    </div>
  )
}
