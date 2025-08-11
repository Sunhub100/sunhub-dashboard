import React, { useMemo } from 'react'

export default function SummaryCards({ data }) {
  const totalOrders = data.length
  const totalQuantity = data.reduce((s, r) => s + (parseFloat(r.Quantity || 0) || 0), 0)
  const totalValue = data.reduce((s, r) => s + (parseFloat((r['Value (USD)'] || r['Value'] || 0)) || 0), 0)

  // orders this month (by shipment date)
  const ordersThisMonth = (() => {
    if (!data.length) return 0
    const now = new Date()
    return data.filter(r => {
      const d = new Date(r['Shipment Date'] || r['Date'] || '')
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length
  })()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
      <Card title="Total Orders" value={totalOrders} />
      <Card title="Total Quantity" value={totalQuantity} />
      <Card title="Total Value (USD)" value={`$${numberWithCommas(totalValue.toFixed(2))}`} />
      <Card title="Orders This Month" value={ordersThisMonth} />
    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  )
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
