import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { pathname } = useLocation()

  const link = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors ${
        pathname === to
          ? 'text-indigo-600'
          : 'text-gray-500 hover:text-gray-800'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-bold text-lg text-indigo-600">VoiceLedger</span>
        <div className="flex gap-6">
          {link('/', 'New Transaction')}
          {link('/ledger', 'Ledger')}
        </div>
      </div>
    </nav>
  )
}
