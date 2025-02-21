"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from "recharts"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"

interface StockData {
  date: string
  price: number
  volume: number
}

interface StockOption {
  symbol: string
  name: string
  currentPrice: number
  change: number
}

export function StockPerformance() {
  const [data, setData] = useState<StockData[]>([])
  const [stockOptions, setStockOptions] = useState<StockOption[]>([])
  const [symbol, setSymbol] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-02-14"),
    to: new Date("2025-02-21"),
  })

  useEffect(() => {
    async function fetchStockOptions() {
      try {
        const response = await fetch("/api/stocks")
        if (!response.ok) throw new Error("Failed to fetch stocks")
        const data = await response.json()
        setStockOptions(data)
        if (data.length > 0 && !symbol) {
          setSymbol(data[0].symbol)
        }
      } catch (err) {
        setError("Failed to load stock options")
        console.error(err)
      }
    }
    fetchStockOptions()
  }, [symbol])

  useEffect(() => {
    async function fetchStockData() {
      if (!symbol) return
      setLoading(true)
      setError(null)
      try {
        const fromDate = dateRange.from.toISOString().split("T")[0]
        const toDate = dateRange.to.toISOString().split("T")[0]
        const response = await fetch(`/api/stock-performance/${symbol}?from=${fromDate}&to=${toDate}`)
        if (!response.ok) throw new Error("Failed to fetch stock data")
        const data = await response.json()
        if (data.length === 0) {
          setError("No data available for the selected date range")
        } else {
          setData(
            data.map((item: any) => ({
              ...item,
              date: new Date(item.date).toISOString().split("T")[0],
            })),
          )
        }
      } catch (err) {
        setError("Failed to load stock data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStockData()
  }, [symbol, dateRange])

  const selectedStock = stockOptions.find((s) => s.symbol === symbol)

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Stock Performance</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={symbol} onValueChange={setSymbol}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select stock" />
              </SelectTrigger>
              <SelectContent>
                {stockOptions.map((option) => (
                  <SelectItem key={option.symbol} value={option.symbol}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {selectedStock && (
          <div className="mb-4">
            <span className="text-2xl font-bold">${selectedStock.currentPrice.toFixed(2)}</span>
            <span className={`ml-2 ${selectedStock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
              {selectedStock.change >= 0 ? "+" : ""}
              {selectedStock.change.toFixed(2)} (
              {((selectedStock.change / (selectedStock.currentPrice - selectedStock.change)) * 100).toFixed(2)}%)
            </span>
          </div>
        )}
        {error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : loading ? (
          <div className="flex justify-center items-center h-[400px]">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis
                yAxisId="left"
                domain={["auto", "auto"]}
                label={{ value: "Price ($)", angle: -90, position: "insideLeft" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={["auto", "auto"]}
                label={{ value: "Volume", angle: 90, position: "insideRight" }}
              />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                formatter={(value: number) => [`$${value.toFixed(2)}`]}
              />
              <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" dot={false} activeDot={{ r: 8 }} />
              <Bar yAxisId="right" dataKey="volume" fill="#82ca9d" opacity={0.5} />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

