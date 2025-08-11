import React, { useState } from 'react'

export default function OrdersTable({ data }) {
  const [page, setPage] = useState(0)
  const pageSize = 10
  const pages = Math.max(1, Math.ceil(data.length / pageSize))
  const pageData = data.slice(page * pageSize, (page+1) * pageSize)

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="px-3 py-2">Order #</th>
              <th className="px-3 py-2">Carrier</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Value (USD)</th>
              <th className="px-3 py-2">Origin</th>
              <th className="px-3 py-2">Destination</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="px-3 py-2">{r['Order Number'] || r['Order'] || r.OrderNumber}</td>
                <td className="px-3 py-2">{r.Carrier}</td>
                <td className="px-3 py-2">{r['Product Description'] || r.Product}</td>
                <td className="px-3 py-2">{r.Quantity}</td>
                <td className="px-3 py-2">{r['Value (USD)'] || r.Value}</td>
                <td className="px-3 py-2">{r['Origin City'] ? r['Origin City']+ ', '+r['Origin State'] : r.Origin}</td>
                <td className="px-3 py-2">{r['Destination City'] ? r['Destination City']+ ', '+r['Destination State'] : r.Destination}</td>
                <td className="px-3 py-2">{r['Shipment Date'] || r.Date}</td>
                <td className="px-3 py-2">{r['Service Type'] || r.Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-gray-600">Showing {pageData.length} of {data.length} orders</div>
        <div>
          <button onClick={() => setPage(Math.max(0, page-1))} className="px-3 py-1 mr-2 bg-gray-100 rounded">Prev</button>
          <button onClick={() => setPage(Math.min(pages-1, page+1))} className="px-3 py-1 bg-gray-100 rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
