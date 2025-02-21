import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  try {
    const { symbol } = params
    const { searchParams } = new URL(request.url)
    const fromDate = searchParams.get("from")
    const toDate = searchParams.get("to")

    if (!fromDate || !toDate) {
      return NextResponse.json({ error: "Missing date parameters" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("home-broker")

    const stock = await db.collection("stocks").findOne({ symbol })

    if (!stock) {
      return NextResponse.json({ error: "Stock not found" }, { status: 404 })
    }

    const historicalData = stock.historicalData.filter((d: any) => {
      const date = new Date(d.date)
      return date >= new Date(fromDate) && date <= new Date(toDate)
    })

    return NextResponse.json(historicalData)
  } catch (error) {
    console.error("Error in stock performance API:", error)
    return NextResponse.json({ error: "Failed to fetch stock performance data" }, { status: 500 })
  }
}

