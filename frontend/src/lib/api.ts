import type { Transaction, TransactionCreate } from '../types/transaction'

const BASE = '/api'

export async function createTransaction(data: TransactionCreate): Promise<Transaction> {
  const res = await fetch(`${BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? 'Failed to save transaction')
  }
  return res.json()
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE}/transactions`)
  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}
