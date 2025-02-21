"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
  id: string
  type: string
  symbol: string
  shares: number
  price: number
  date: string
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function fetchTransactions() {
      const response = await fetch("/api/transactions/1") // Assuming user ID 1 for now
      const data = await response.json()
      setTransactions(data)
    }
    fetchTransactions()
  }, [])

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Shares</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.symbol}</TableCell>
                <TableCell>{transaction.shares}</TableCell>
                <TableCell>${transaction.price.toFixed(2)}</TableCell>
                <TableCell>${(transaction.shares * transaction.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

