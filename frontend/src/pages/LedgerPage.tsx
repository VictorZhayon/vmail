import LedgerView from '../components/LedgerView'

export default function LedgerPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ledger</h1>
        <p className="text-sm text-gray-500 mt-1">Your complete transaction history.</p>
      </div>
      <LedgerView />
    </div>
  )
}
