"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

export function WatchList() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await fetch("/api/stocks")
        if (!response.ok) {
          throw new Error("Failed to fetch stocks")
        }
        const data = await response.json()
        setStocks(data)
      } catch (err) {
        setError("Failed to load stocks. Please try again later.")
        console.error("Error fetching stocks:", err)
      }
    }
    fetchStocks()
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watch List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell className="font-medium">{stock.symbol}</TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell>${stock.currentPrice?.toFixed(2) ?? "N/A"}</TableCell>
                <TableCell className={stock.change >= 0 ? "text-green-600" : "text-red-600"}>
                  {stock.change != null ? (
                    <>
                      {stock.change > 0 ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

