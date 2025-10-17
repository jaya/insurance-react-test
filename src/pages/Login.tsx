import { useState } from 'react'

type Props = {
  onLogin: (username: string) => void
}

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      onLogin(username)
    } else {
      setError('Invalid username or password. Use admin / admin')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sign in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
          <input
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 shadow-sm focus:ring-primary focus:border-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            aria-label="username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 shadow-sm focus:ring-primary focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin"
            aria-label="password"
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Sign in</button>
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-500">Credentials for the test: <strong>admin / admin</strong></p>
    </div>
  )
}
