import { useEffect, useState } from 'react'
import type { Transaction } from '../types/transaction'
import { getTransactions, deleteTransaction } from '../lib/api'
import EditTransactionModal from './EditTransactionModal'

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

const fmtTimestamp = (ts: string) =>
  new Date(ts).toLocaleString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
      <button
        onClick={onEdit}
        className="p-1.5 rounded text-gray-400 hover:text-primary-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Edit"
      >
        <PencilIcon />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
        title="Delete"
      >
        <TrashIcon />
      </button>
    </div>
  )
}

function TransactionColumn({
  title,
  transactions,
  type,
  onEdit,
  onDelete,
}: {
  title: string
  transactions: Transaction[]
  type: 'income' | 'expense'
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}) {
  const total = transactions.reduce((s, t) => s + Number(t.amount), 0)
  const dotColor = type === 'income' ? 'bg-green-500' : 'bg-red-400'
  const amountColor = type === 'income' ? 'text-green-600' : 'text-red-500'
  const totalColor = type === 'income' ? 'text-green-600' : 'text-red-500'
  const sign = type === 'income' ? '+' : '-'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col transition-colors">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-baseline justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
          <span className="text-xs text-gray-400">
            {transactions.length} record{transactions.length !== 1 ? 's' : ''}
          </span>
        </div>
        <span className={`text-sm font-semibold ${totalColor}`}>{fmt(total)}</span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-400 py-12 text-sm px-4">No {type} records yet.</p>
      ) : (
        <ul className="divide-y divide-gray-50 dark:divide-gray-700 flex-1">
          {transactions.map(t => (
            <li key={t.id} className="group px-5 py-4 flex items-start gap-3">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${dotColor}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.category}</span>
                  {t.customer_name && (
                    <span className="text-xs text-gray-400 truncate">&middot; {t.customer_name}</span>
                  )}
                </div>
                {t.note && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">{t.note}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{fmtDate(t.transaction_date)}</p>
                <p className="text-xs text-gray-300 dark:text-gray-500 mt-0.5">Recorded {fmtTimestamp(t.created_at)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-sm font-semibold ${amountColor}`}>
                  {sign}{fmt(Number(t.amount))}
                </span>
                <RowActions onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function LedgerView() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Transaction | null>(null)

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this transaction? This cannot be undone.')) return
    try {
      await deleteTransaction(id)
      setTransactions(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  function handleSaved(updated: Transaction) {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t))
    setEditing(null)
  }

  if (loading) {
    return <p className="text-center text-gray-400 py-16 text-sm">Loading transactions...</p>
  }
  if (error) {
    return <p className="text-center text-red-500 py-16 text-sm">{error}</p>
  }
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-16 text-center transition-colors">
        <p className="text-base font-semibold text-gray-500 dark:text-gray-400">No Transaction History</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Your recorded transactions will appear here.</p>
      </div>
    )
  }

  const income = transactions.filter(t => t.type === 'income')
  const expenses = transactions.filter(t => t.type === 'expense')
  const totalIncome = income.reduce((s, t) => s + Number(t.amount), 0)
  const totalExpense = expenses.reduce((s, t) => s + Number(t.amount), 0)
  const balance = totalIncome - totalExpense

  return (
    <>
      <div className="space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Income</p>
            <p className="text-base font-semibold text-green-600">{fmt(totalIncome)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Expenses</p>
            <p className="text-base font-semibold text-red-500">{fmt(totalExpense)}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Net Balance</p>
            <p className={`text-base font-semibold ${balance >= 0 ? 'text-primary-600' : 'text-red-600'}`}>
              {fmt(balance)}
            </p>
          </div>
        </div>

        {/* Two-column transaction view */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <TransactionColumn
            title="Income"
            transactions={income}
            type="income"
            onEdit={setEditing}
            onDelete={handleDelete}
          />
          <TransactionColumn
            title="Expenses"
            transactions={expenses}
            type="expense"
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        </div>

        {/* Full transaction history */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-baseline gap-2">
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">Transaction History</h2>
            <span className="text-xs text-gray-400">
              {transactions.length} record{transactions.length !== 1 ? 's' : ''}
            </span>
          </div>

          <ul className="divide-y divide-gray-50 dark:divide-gray-700">
            {transactions.map(t => (
              <li key={t.id} className="group px-6 py-4 flex items-center gap-4">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    t.type === 'income' ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.category}</span>
                    {t.customer_name && (
                      <span className="text-xs text-gray-400 truncate">&middot; {t.customer_name}</span>
                    )}
                  </div>
                  {t.note && (
                    <p className="text-xs text-gray-400 truncate mt-0.5">{t.note}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(Number(t.amount))}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{fmtDate(t.transaction_date)}</p>
                    <p className="text-xs text-gray-300 dark:text-gray-500 mt-0.5">Recorded {fmtTimestamp(t.created_at)}</p>
                  </div>
                  <RowActions onEdit={() => setEditing(t)} onDelete={() => handleDelete(t.id)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onSave={handleSaved}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  )
}
