"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: string
  name: string
  balance: number
}

export function AccountSummary() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/api/user/1") // Assuming user ID 1 for now
      const data = await response.json()
      setUser(data)
    }
    fetchUser()
  }, [])

  if (!user) return <div>Loading...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-3xl font-semibold">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Available Cash</dt>
            <dd className="mt-1 text-3xl font-semibold">${user.balance.toFixed(2)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

