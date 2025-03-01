"use client"

import { useState, useCallback } from "react"
import { Page, Layout, Card, Tabs, DataTable, Filters } from "@shopify/polaris"
import { SurveyResponseChart } from "@/components/dashboard/survey-response-chart"
import { SurveyResponseMap } from "@/components/dashboard/survey-response-map"
import { SurveyEditor } from "@/components/dashboard/survey-editor"

export default function Dashboard() {
    const [selected, setSelected] = useState(0)
    const [queryValue, setQueryValue] = useState("")
    const [dateRange, setDateRange] = useState({
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date(),
    })

    const handleTabChange = useCallback((selectedTabIndex: number) => {
        setSelected(selectedTabIndex)
    }, [])

    const tabs = [
        {
            id: "dashboard",
            content: "Dashboard",
            accessibilityLabel: "Dashboard",
            panelID: "dashboard-panel",
        },
        {
            id: "responses",
            content: "Responses",
            accessibilityLabel: "Responses",
            panelID: "responses-panel",
        },
        {
            id: "settings",
            content: "Survey Settings",
            accessibilityLabel: "Survey Settings",
            panelID: "settings-panel",
        },
    ]

    const mockResponses = [
        ["#1001", "John Doe", "Very Satisfied", "Price", "2023-10-15"],
        ["#1002", "Jane Smith", "Satisfied", "Product Quality", "2023-10-16"],
        ["#1003", "Bob Johnson", "Neutral", "Shipping", "2023-10-17"],
        ["#1004", "Alice Brown", "Unsatisfied", "Customer Service", "2023-10-18"],
        ["#1005", "Charlie Wilson", "Very Satisfied", "Product Selection", "2023-10-19"],
    ]

    return (
        <Page fullWidth title="CausalFunnel Dashboard">
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                {selected === 0 && (
                    <Layout>
                        <Layout.Section>
                            <Card>
                                <div className="p-8 bg-white rounded-xl shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Survey Response Overview</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                        <Card>
                                            <div className="p-6 text-center bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Total Responses</p>
                                                <p className="text-4xl font-extrabold text-gray-900">1,245</p>
                                            </div>
                                        </Card>
                                        <Card>
                                            <div className="p-6 text-center bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Completion Rate</p>
                                                <p className="text-4xl font-extrabold text-gray-900">78%</p>
                                            </div>
                                        </Card>
                                        <Card>
                                            <div className="p-6 text-center bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600">Avg. Satisfaction</p>
                                                <p className="text-4xl font-extrabold text-gray-900">4.2/5</p>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="h-80">
                                        <SurveyResponseChart />
                                    </div>
                                </div>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card>
                                <div className="p-8 bg-white rounded-xl shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Geographic Distribution</h2>
                                    <div className="h-80">
                                        <SurveyResponseMap />
                                    </div>
                                </div>
                            </Card>
                            <Card>
                                <div className="p-8 bg-white rounded-xl shadow-md">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Feedback Categories</h2>
                                    <ul className="space-y-4">
                                        <li className="flex justify-between text-lg">
                                            <span>Product Quality</span>
                                            <span className="font-semibold">32%</span>
                                        </li>
                                        <li className="flex justify-between text-lg">
                                            <span>Pricing</span>
                                            <span className="font-semibold">28%</span>
                                        </li>
                                        <li className="flex justify-between text-lg">
                                            <span>Shipping</span>
                                            <span className="font-semibold">18%</span>
                                        </li>
                                        <li className="flex justify-between text-lg">
                                            <span>Customer Service</span>
                                            <span className="font-semibold">12%</span>
                                        </li>
                                        <li className="flex justify-between text-lg">
                                            <span>Website Experience</span>
                                            <span className="font-semibold">10%</span>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Layout.Section>
                    </Layout>
                )}
                {selected === 1 && (
                    <Card>
                        <div className="p-8 bg-white rounded-xl shadow-md">
                            <Filters
                                queryValue={queryValue}
                                queryPlaceholder="Search responses"
                                onQueryChange={setQueryValue}
                                onQueryClear={() => setQueryValue("")}
                                filters={[]}
                            />
                            <DataTable
                                columnContentTypes={["text", "text", "text", "text", "text"]}
                                headings={["Order ID", "Customer", "Satisfaction", "Primary Concern", "Date"]}
                                rows={mockResponses}
                            />
                        </div>
                    </Card>
                )}
                {selected === 2 && (
                    <Card>
                        <div className="p-8 bg-white rounded-xl shadow-md">
                            <SurveyEditor />
                        </div>
                    </Card>
                )}
            </Tabs>
        </Page>
    )
}
