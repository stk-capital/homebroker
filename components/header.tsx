import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              HomeBroker
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/market">Market</Link>
            <Link href="/orders">Orders</Link>
            <Button variant="secondary" size="sm">
              Log out
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

