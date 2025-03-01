import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const body = await req.json()

        // Validate the request body (basic validation for required fields)
        if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
            return NextResponse.json({ error: "Invalid or empty request body" }, { status: 400 })
        }

        if (!body.q1 || !body.q2) {
            return NextResponse.json(
                { error: "Missing required fields: q1 (satisfaction) and q2 (primary reason)" },
                { status: 400 }
            )
        }

        // Connect to MongoDB
        const { db } = await connectToDatabase()

        // Ensure the data includes a timestamp
        const surveyData = {
            ...body,
            timestamp: body.timestamp || new Date().toISOString(),
        }

        // Insert the survey response into the database
        const result = await db.collection("survey_responses").insertOne(surveyData)

        return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error("⚠️ Error submitting survey:", error)
        return NextResponse.json(
            { error: "An error occurred while submitting the survey." },
            { status: 500 }
        )
    }
}
