import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-6 transition-colors">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} VMail Solutions. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
