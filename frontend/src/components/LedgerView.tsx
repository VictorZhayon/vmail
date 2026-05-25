import { useEffect, useState } from 'react'
import type { Transaction } from '../types/transaction'
import { getTransactions } from '../lib/api'

const fmt = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 2,
  }).format(amount)

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export default function LedgerView() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-center text-gray-400 py-16 text-sm">Loading transactions...</p>
  }
  if (error) {
    return <p className="text-center text-red-500 py-16 text-sm">{error}</p>
  }

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((s, t) => s + Number(t.amount), 0)
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((s, t) => s + Number(t.amount), 0)
  const balance = totalIncome - totalExpense

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Income</p>
          <p className="text-base font-semibold text-green-600">{fmt(totalIncome)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total Expenses</p>
          <p className="text-base font-semibold text-red-500">{fmt(totalExpense)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Net Balance</p>
          <p className={`text-base font-semibold ${balance >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
            {fmt(balance)}
          </p>
        </div>
      </div>

      {/* Transaction list */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-baseline gap-2">
          <h2 className="font-semibold text-gray-800">Transaction History</h2>
          <span className="text-xs text-gray-400">{transactions.length} record{transactions.length !== 1 ? 's' : ''}</span>
        </div>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-400 py-16 text-sm">
            No transactions yet. Record your first one.
          </p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {transactions.map(t => (
              <li key={t.id} className="px-6 py-4 flex items-center gap-4">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    t.type === 'income' ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">{t.category}</span>
                    {t.customer_name && (
                      <span className="text-xs text-gray-400 truncate">&middot; {t.customer_name}</span>
                    )}
                  </div>
                  {t.note && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{t.note}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}{fmt(Number(t.amount))}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{fmtDate(t.transaction_date)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
