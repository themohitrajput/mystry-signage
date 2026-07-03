// Minimal generic table for admin lists (projects, categories, messages).
// columns: [{ key, label, render?: (row) => node }]
export default function DataTable({ columns, rows, emptyMessage = 'No records found.' }) {
  if (!rows || rows.length === 0) {
    return <p className="py-12 text-center text-ash">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-ash/15">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-panel text-ash">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ash/10">
          {rows.map((row) => (
            <tr key={row._id} className="text-paper hover:bg-panel/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
