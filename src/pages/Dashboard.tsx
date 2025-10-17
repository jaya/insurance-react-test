import { useEffect, useState } from 'react'
import { getInsurers } from '../lib/api.ts'
import InsurerList from '../components/InsurerList.tsx'
import PolicyForm from '../components/PolicyForm.tsx'
import type { Insurer } from '../types'

type Props = {
  user: string
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: Props) {
  const [insurers, setInsurers] = useState<Insurer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getInsurers()
      .then((data: { insurers?: Insurer[] }) => {
        setInsurers(data.insurers ?? [])
      })
      .catch((err: unknown) => setError(String(err)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Insurance Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">{user}</span>
          <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h2 className="text-lg font-medium mb-3">Insurers</h2>
          {loading && <div>Loading insurers...</div>}
          {error && <div className="text-red-600">Error: {error}</div>}
          {!loading && !error && <InsurerList insurers={insurers} />}
        </section>

        <aside className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-lg font-medium mb-3">Create Policy</h2>
          <PolicyForm insurers={insurers} />
        </aside>
      </main>
    </div>
  )
}
