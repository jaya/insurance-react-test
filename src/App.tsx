import { useState } from 'react'
import './App.css'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  const handleLogin = (username: string) => {
    setIsAuthenticated(true)
    setUser(username)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        {!isAuthenticated ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard user={user ?? 'admin'} onLogout={handleLogout} />
        )}
      </div>
    </div>
  )
}

export default App
