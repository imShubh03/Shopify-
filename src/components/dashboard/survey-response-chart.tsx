"use client"

import { useEffect, useRef } from "react"
import { Select } from "@shopify/polaris"
import { useState } from "react"

export function SurveyResponseChart() {
    const [timeRange, setTimeRange] = useState("30d")
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const ctx = canvasRef.current.getContext("2d")
        if (!ctx) return

        // Mock data
        const labels = ["Week 1", "Week 2", "Week 3", "Week 4"]
        const data = [65, 78, 90, 81]

        // Clear canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        // Set dimensions
        const width = canvasRef.current.width
        const height = canvasRef.current.height
        const barWidth = width / labels.length / 2
        const maxValue = Math.max(...data)
        const scale = height / maxValue

        // Draw bars
        ctx.fillStyle = "#5c6ac4"
        data.forEach((value, index) => {
            const x = (index * width) / labels.length + barWidth / 2
            const barHeight = value * scale * 0.8
            ctx.fillRect(x, height - barHeight, barWidth, barHeight)
        })

        // Draw labels
        ctx.fillStyle = "#212b36"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        labels.forEach((label, index) => {
            const x = (index * width) / labels.length + barWidth
            ctx.fillText(label, x, height - 10)
        })
    }, [canvasRef]) // Only canvasRef is needed as a dependency

    return (
        <div className="h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Response Trend</h3>
                <Select
                    label=""
                    labelHidden
                    options={[
                        { label: "Last 30 days", value: "30d" },
                        { label: "Last 90 days", value: "90d" },
                        { label: "Last year", value: "1y" },
                    ]}
                    value={timeRange}
                    onChange={setTimeRange}
                />
            </div>
            <div className="h-64">
                <canvas ref={canvasRef} width="800" height="300" className="w-full h-full"></canvas>
            </div>
        </div>
    )
}

