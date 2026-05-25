import TransactionForm from '../components/TransactionForm'

export default function HomePage() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Transaction</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Record an income or expense manually.</p>
      </div>
      <TransactionForm />
    </div>
  )
}
