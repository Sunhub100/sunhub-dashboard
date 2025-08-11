import React from 'react'
import Papa from 'papaparse'

export default function UploadCSV({ onParsed }) {
  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        // Normalize keys: trim and remove BOM
        const rows = results.data.map(r => {
          const obj = {}
          Object.keys(r).forEach(k => {
            const nk = k.replace(/\uFEFF/g,'').trim()
            obj[nk] = r[k].trim ? r[k].trim() : r[k]
          })
          return obj
        })
        onParsed(rows)
      }
    })
  }

  return (
    <label className="inline-block">
      <input type="file" accept=".csv" onChange={handleFile} className="hidden" id="csvUpload"/>
      <button onClick={() => document.getElementById('csvUpload').click()} className="px-4 py-2 bg-sky-600 text-white rounded shadow">
        Upload CSV
      </button>
    </label>
  )
}
