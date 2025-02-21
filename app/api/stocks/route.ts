import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("home-broker")

    const stocks = await db.collection("stocks").find({}).toArray()
    const stockList = stocks.map(({ _id, symbol, name, currentPrice, change }) => ({
      symbol,
      name,
      currentPrice,
      change,
    }))
    return NextResponse.json(stockList)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stocks" }, { status: 500 })
  }
}

