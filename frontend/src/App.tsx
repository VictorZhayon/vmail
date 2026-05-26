import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import NavBar from './components/NavBar'
import Onboarding from './components/Onboarding'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import LedgerPage from './pages/LedgerPage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { isDark, toggle } = useTheme()
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('onboarded')
  )

  function handleOnboardingDone() {
    localStorage.setItem('onboarded', 'true')
    setShowOnboarding(false)
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <NavBar isDark={isDark} onToggle={toggle} />
          <main className="max-w-4xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/ledger" element={<ProtectedRoute><LedgerPage /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          {showOnboarding && <Onboarding onDone={handleOnboardingDone} />}
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
