import type { Transaction, TransactionCreate } from '../types/transaction'
import { supabase } from './supabase'

const BASE = import.meta.env.VITE_API_URL ?? '/api'

async function authHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('Not authenticated')
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.access_token}`,
  }
}

export async function createTransaction(data: TransactionCreate): Promise<Transaction> {
  const res = await fetch(`${BASE}/transactions`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail ?? 'Failed to save transaction')
  }
  return res.json()
}

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE}/transactions`, { headers: await authHeaders() })
  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}
