import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { deleteAccount } from '../lib/api'
import { supabase } from '../lib/supabase'

export default function AccountPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setError(null)
    setLoading(true)
    try {
      await deleteAccount()
      await supabase.auth.signOut()
      navigate('/auth', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  const confirmed = confirmation === 'DELETE'

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings.</p>
      </div>

      {/* Profile card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-4 transition-colors">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Profile</h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Email</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{user?.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Account ID</p>
            <p className="text-xs font-mono text-gray-400 dark:text-gray-500 truncate">{user?.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Joined</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
                : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-red-200 dark:border-red-900 p-6 transition-colors">
        <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-1">Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Permanently delete your account and all transaction records. This cannot be undone.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        >
          Delete Account
        </button>
      </div>

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Delete your account?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
              All your transactions and account data will be permanently deleted. This action <span className="font-semibold text-gray-700 dark:text-gray-200">cannot be reversed</span>.
            </p>

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type <span className="font-mono font-bold text-red-500">DELETE</span> to confirm
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={e => setConfirmation(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg py-2 px-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors mb-4"
              placeholder="DELETE"
              autoComplete="off"
            />

            {error && (
              <p className="text-sm text-red-600 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowModal(false); setConfirmation(''); setError(null) }}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!confirmed || loading}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 disabled:opacity-40 text-white text-sm font-medium transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
