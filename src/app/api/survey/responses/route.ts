import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
    try {
        // Extract query parameters
        const searchParams = req.nextUrl.searchParams
        const limit = Number.parseInt(searchParams.get("limit") || "100", 10) || 100
        const skip = Number.parseInt(searchParams.get("skip") || "0", 10) || 0
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")

        // Connect to MongoDB
        const { db } = await connectToDatabase()

        // Construct filter for date range
        const filter: any = {}

        if (startDate || endDate) {
            filter.timestamp = {}
            if (startDate) filter.timestamp.$gte = new Date(startDate).toISOString()
            if (endDate) filter.timestamp.$lte = new Date(endDate).toISOString()
        }

        // Fetch survey responses with pagination
        const responses = await db
            .collection("survey_responses")
            .find(filter)
            .sort({ timestamp: -1 }) // Latest responses first
            .skip(skip)
            .limit(limit)
            .toArray()

        // Get total count of responses
        const totalResponses = await db.collection("survey_responses").countDocuments(filter)

        return NextResponse.json({
            responses,
            pagination: {
                totalResponses,
                limit,
                skip,
            },
        })
    } catch (error) {
        console.error("⚠️ Error fetching survey responses:", error)
        return NextResponse.json(
            { error: "An error occurred while fetching survey responses." },
            { status: 500 }
        )
    }
}
