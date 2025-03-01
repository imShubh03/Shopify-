import { type NextRequest, NextResponse } from "next/server"
import { cartSurveyScript } from "@/lib/shopify-script-tag"

export async function POST(req: NextRequest) {
    try {
        const { shop, accessToken } = await req.json()

        if (!shop || !accessToken) {
            return NextResponse.json({ error: "Missing shop or accessToken" }, { status: 400 })
        }

        // Create a script tag in the Shopify store
        const response = await fetch(`https://${shop}/admin/api/2023-07/script_tags.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": accessToken,
            },
            body: JSON.stringify({
                script_tag: {
                    event: "onload",
                    src: "https://your-app-domain.com/api/shopify/survey-script",
                    display_scope: "online_store",
                },
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`Failed to create script tag: ${JSON.stringify(errorData)}`)
        }

        const data = await response.json()

        return NextResponse.json({ success: true, scriptTag: data.script_tag })
    } catch (error) {
        console.error("Error creating script tag:", error)
        return NextResponse.json({ error: "Failed to create script tag" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    // This endpoint serves the survey script
    return new NextResponse(cartSurveyScript, {
        headers: {
            "Content-Type": "application/javascript",
        },
    })
}

