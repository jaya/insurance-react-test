import type { Insurer } from '../types'

type Props = { insurers: Insurer[] }

export default function InsurerList({ insurers }: Props) {
  if (!insurers || insurers.length === 0) {
    return <div className="text-sm text-gray-500">No insurers available.</div>
  }

  return (
    <div className="space-y-4">
      {insurers.map((ins) => (
        <div key={ins.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">{ins.company_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{ins.insurance_type} — {ins.country}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Rating: {ins.average_rating}</div>
              <div className={`mt-2 inline-flex px-2 py-1 text-xs rounded ${ins.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                {ins.is_active ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">{ins.description}</p>

          <div className="mt-3 text-sm text-gray-500">
            Founded: {ins.founded_year} • Plans: {ins.plans?.length ?? 0}
          </div>
        </div>
      ))}
    </div>
  )
}
