import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("home-broker")

    const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}

