import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("home-broker")

    const user = await db.collection("users").findOne({ 
      email: decodeURIComponent(params.email) 
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { password, _id, ...safeUser } = user
    return NextResponse.json({ ...safeUser, id: _id.toString() })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    )
  }
} 