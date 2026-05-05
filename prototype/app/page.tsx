export default function HomePage() {
  return (
    <div className="px-4 pt-12 pb-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Good morning,</p>
        <h1 className="text-2xl font-bold text-gray-900">Alex Matthews</h1>
      </div>

      <div className="bg-blue-900 rounded-2xl p-5 text-white mb-6">
        <p className="text-xs text-blue-300 uppercase tracking-wide mb-1">Total balance</p>
        <p className="text-3xl font-bold mb-5">£12,450.00</p>
        <div className="flex justify-between">
          <div>
            <p className="text-xs text-blue-300">Current account</p>
            <p className="text-sm font-semibold">£4,200.00</p>
          </div>
          <div>
            <p className="text-xs text-blue-300">Savings</p>
            <p className="text-sm font-semibold">£8,250.00</p>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent transactions</h2>
      <div className="bg-white rounded-xl divide-y divide-gray-100">
        {[
          { name: 'Grocery Store', amount: '-£43.20', date: 'Today, 10:23' },
          { name: 'Direct Debit — Rent', amount: '-£1,200.00', date: 'Yesterday' },
          { name: 'Salary', amount: '+£3,400.00', date: '1 May' },
          { name: 'Coffee Shop', amount: '-£4.50', date: '30 Apr' },
        ].map((tx) => (
          <div key={tx.name + tx.date} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-900">{tx.name}</p>
              <p className="text-xs text-gray-400">{tx.date}</p>
            </div>
            <p className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>
              {tx.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
