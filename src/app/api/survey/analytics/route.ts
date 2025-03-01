import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
    try {
        // Connect to MongoDB
        const { db } = await connectToDatabase()

        // Extract query parameters
        const searchParams = req.nextUrl.searchParams
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")

        // Construct date filter
        const dateFilter: any = {}
        if (startDate || endDate) {
            dateFilter.timestamp = {}
            if (startDate) dateFilter.timestamp.$gte = new Date(startDate).toISOString()
            if (endDate) dateFilter.timestamp.$lte = new Date(endDate).toISOString()
        }

        // Fetch total survey responses
        const totalResponses = await db.collection("survey_responses").countDocuments(dateFilter)

        // Aggregate satisfaction ratings (q1)
        const satisfactionData = await db.collection("survey_responses").aggregate([
            { $match: { ...dateFilter, q1: { $exists: true } } },
            { $group: { _id: "$q1", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]).toArray()

        // Aggregate primary concerns (q2)
        const primaryConcerns = await db.collection("survey_responses").aggregate([
            { $match: { ...dateFilter, q2: { $exists: true } } },
            { $group: { _id: "$q2", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]).toArray()

        // Aggregate daily response trends
        const responseTrend = await db.collection("survey_responses").aggregate([
            { $match: dateFilter },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$timestamp" } } },
                },
            },
            { $group: { _id: "$date", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]).toArray()

        // Return JSON response
        return NextResponse.json({
            totalResponses,
            satisfactionData,
            primaryConcerns,
            responseTrend,
        })
    } catch (error) {
        console.error("⚠️ Error fetching analytics data:", error)
        return NextResponse.json(
            { error: "An error occurred while fetching survey analytics." },
            { status: 500 }
        )
    }
}
