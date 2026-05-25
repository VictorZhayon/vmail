import { useState } from 'react'
import type { TransactionCreate, TransactionType } from '../types/transaction'
import { createTransaction } from '../lib/api'

const CATEGORIES: Record<TransactionType, string[]> = {
  income: ['Sales', 'Services', 'Refund', 'Other Income'],
  expense: ['Supplies', 'Equipment', 'Rent', 'Utilities', 'Transport', 'Food', 'Salary', 'Other Expense'],
}

function emptyForm(): TransactionCreate {
  return {
    amount: 0,
    type: 'income',
    category: CATEGORIES.income[0],
    note: '',
    customer_name: '',
    transaction_date: new Date().toISOString().split('T')[0],
  }
}

export default function TransactionForm() {
  const [form, setForm] = useState<TransactionCreate>(emptyForm())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleTypeChange(type: TransactionType) {
    setForm(f => ({ ...f, type, category: CATEGORIES[type][0] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    try {
      await createTransaction({
        ...form,
        amount: Number(form.amount),
        note: form.note || undefined,
        customer_name: form.customer_name || undefined,
      })
      setSuccess(true)
      setForm(emptyForm())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">Record Transaction</h2>

      {/* Type toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {(['income', 'expense'] as TransactionType[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
                form.type === t
                  ? t === 'income'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">&#8358;</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            required
            value={form.amount || ''}
            onChange={e => setForm(f => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
            className="w-full border border-gray-200 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          required
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          className={inputClass}
        >
          {CATEGORIES[form.type].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input
          type="date"
          required
          value={form.transaction_date}
          onChange={e => setForm(f => ({ ...f, transaction_date: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Customer / Vendor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {form.type === 'income' ? 'Customer' : 'Vendor'} Name{' '}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={form.customer_name}
          onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
          className={inputClass}
          placeholder={form.type === 'income' ? 'e.g. Chioma Obi' : 'e.g. Metro Supplies'}
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          value={form.note}
          onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Any additional details..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          Transaction saved successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
      >
        {loading ? 'Saving...' : 'Save Transaction'}
      </button>
    </form>
  )
}
