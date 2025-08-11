import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts'

const COLORS = ['#60A5FA', '#34D399', '#F59E0B', '#F97316', '#EF4444']

export default function ChartsArea({ data }) {
  // prepare data
  const ordersByCarrier = []
  const carrierMap = {}
  const serviceMap = { LTL:0, FTL:0 }
  const dailyMap = {}

  data.forEach(r => {
    const c = r.Carrier || 'Unknown'
    carrierMap[c] = (carrierMap[c] || 0) + 1

    const t = (r['Service Type'] || r.Type || 'LTL').toUpperCase()
    serviceMap[t] = (serviceMap[t] || 0) + 1

    const d = new Date(r['Shipment Date'] || r.Date || '')
    if (!isNaN(d)) {
      const key = d.toISOString().slice(0,10)
      dailyMap[key] = (dailyMap[key] || 0) + 1
    }
  })

  for (const k in carrierMap) ordersByCarrier.push({ name: k, orders: carrierMap[k] })
  const pieData = Object.keys(serviceMap).map(k => ({ name: k, value: serviceMap[k] }))
  const lineData = Object.keys(dailyMap).sort().map(k => ({ date: k, orders: dailyMap[k] }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
      <div className="bg-white p-4 rounded-lg shadow col-span-2">
        <h4 className="font-semibold mb-2">Orders by Carrier</h4>
        <div style={{height:250}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersByCarrier}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="font-semibold mb-2">LTL vs FTL</h4>
        <div style={{height:200}}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={70} fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow col-span-3">
        <h4 className="font-semibold mb-2">Orders Over Time</h4>
        <div style={{height:220}}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#34D399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
