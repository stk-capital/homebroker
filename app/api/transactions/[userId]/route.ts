import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    if (!ObjectId.isValid(params.userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("home-broker")

    const transactions = await db
      .collection("transactions")
      .find({ userId: new ObjectId(params.userId) })
      .toArray()

    // Converter para ISO string para parsing consistente
    const formattedTransactions = transactions.map(t => ({
      id: t._id.toString(),
      ...t,
      date: t.date.toISOString()
    }))

    return NextResponse.json(formattedTransactions || [])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

