import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("home-broker")

    const transactions = await db
      .collection("transactions")
      .find({ userId: new ObjectId(params.userId) })
      .toArray()

    return NextResponse.json(transactions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

