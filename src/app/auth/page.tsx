"use client"

import type React from "react"

import { useState } from "react"
import { Button, Card, Layout, Page, TextField } from "@shopify/polaris"
import { useRouter } from "next/navigation"

export default function Auth() {
    const [shop, setShop] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // In a real implementation, this would redirect to Shopify OAuth
            // For demo purposes, we'll just redirect to the dashboard
            router.push("/dashboard")
        } catch (error) {
            console.error("Authentication error:", error)
            setIsLoading(false)
        }
    }

    return (
        <Page narrowWidth>
            <Layout>
                <Layout.Section>
                    <Card>
                        <div className="p-6">
                            <h1 className="text-2xl font-bold mb-6">CausalFunnel - Cart Survey App</h1>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Shop Domain"
                                    type="text"
                                    value={shop}
                                    onChange={setShop}
                                    placeholder="your-store.myshopify.com"
                                    autoComplete="off"
                                    helpText="Enter your Shopify store domain to continue"
                                    requiredIndicator
                                />
                                <div className="mt-6">
                                    <Button primary submit loading={isLoading}>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
}
