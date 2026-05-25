export type TransactionType = 'income' | 'expense'

export interface TransactionCreate {
  amount: number
  type: TransactionType
  category: string
  note?: string
  customer_name?: string
  transaction_date: string
}

export interface Transaction extends TransactionCreate {
  id: string
  created_at: string
}
