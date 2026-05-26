import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

interface NavBarProps {
  isDark: boolean
  onToggle: () => void
}

export default function NavBar({ isDark, onToggle }: NavBarProps) {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        pathname === to
          ? 'text-primary-600'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <img src={logo} alt="VMail Solutions" className="h-10 w-auto" />

        <div className="flex items-center gap-6">
          {user && (
            <>
              {link('/', 'New Transaction')}
              {link('/ledger', 'Ledger')}
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={onToggle}
            aria-label="Toggle theme"
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
          >
            <span className="text-yellow-500">{isDark ? <SunIcon /> : null}</span>
            <div className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${isDark ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className="text-gray-400">{!isDark ? <MoonIcon /> : null}</span>
          </button>

          {/* User */}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block max-w-[140px] truncate">
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
