import { Header } from "@/components/header"
import { AccountSummary } from "@/components/account-summary"
import { WatchList } from "@/components/watch-list"
import { RecentTransactions } from "@/components/recent-transactions"
import { StockPerformance } from "@/components/stock-performance"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AccountSummary />
            <WatchList />
          </div>
          <div className="mt-6">
            <StockPerformance />
          </div>
          <RecentTransactions />
        </div>
      </main>
    </div>
  )
}

