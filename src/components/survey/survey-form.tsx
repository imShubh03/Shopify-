"use client"

import { useState, useCallback } from "react"
import { Button, Card, FormLayout, TextField, ChoiceList, InlineError } from "@shopify/polaris"

interface SurveyQuestion {
    id: string
    text: string
    type: "multiple_choice" | "rating" | "text" | "boolean"
    options?: string[]
    required: boolean
}

interface SurveyFormProps {
    title: string
    description: string
    questions: SurveyQuestion[]
    onSubmit: (responses: Record<string, any>) => void
    onClose: () => void
}

export function SurveyForm({ title, description, questions, onSubmit, onClose }: SurveyFormProps) {
    const [responses, setResponses] = useState<Record<string, any>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = useCallback(
        (questionId: string, value: any) => {
            setResponses((prev) => ({ ...prev, [questionId]: value }))

            // Clear error for this question if it exists
            if (errors[questionId]) {
                setErrors((prev) => {
                    const newErrors = { ...prev }
                    delete newErrors[questionId]
                    return newErrors
                })
            }
        },
        [errors],
    )

    const handleSubmit = useCallback(() => {
        // Validate required questions
        const newErrors: Record<string, string> = {}

        questions.forEach((question) => {
            if (question.required && (!responses[question.id] || responses[question.id] === "")) {
                newErrors[question.id] = "This question is required"
            }
        })

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // Submit responses
        onSubmit(responses)
    }, [questions, responses, onSubmit])

    return (
        <Card>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <Button plain onClick={onClose}>
                        ×
                    </Button>
                </div>

                <p className="mb-6 text-gray-600">{description}</p>

                <FormLayout>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-4">
                            <div className="mb-2">
                                <label className="font-medium">
                                    {question.text}
                                    {question.required && <span className="text-red-500 ml-1">*</span>}
                                </label>
                            </div>

                            {question.type === "text" && (
                                <TextField
                                    label={question.text}
                                    value={responses[question.id] || ""}
                                    onChange={(value) => handleChange(question.id, value)}
                                    multiline={4}
                                    autoComplete="off"
                                    error={errors[question.id]}
                                />
                            )}

                            {question.type === "multiple_choice" && question.options && (
                                <div>
                                    <ChoiceList
                                        choices={question.options.map((option) => ({ label: option, value: option }))}
                                        selected={responses[question.id] ? [responses[question.id]] : []}
                                        onChange={(selected) => handleChange(question.id, selected[0])} title={undefined}                                    />
                                    {errors[question.id] && <InlineError message={errors[question.id]} fieldID={question.id} />}
                                </div>
                            )}

                            {question.type === "rating" && (
                                <div>
                                    <div className="flex space-x-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${responses[question.id] === rating
                                                        ? "bg-indigo-600 text-white"
                                                        : "bg-gray-100 hover:bg-gray-200"
                                                    }`}
                                                onClick={() => handleChange(question.id, rating)}
                                            >
                                                {rating}
                                            </button>
                                        ))}
                                    </div>
                                    {errors[question.id] && <InlineError message={errors[question.id]} fieldID={question.id} />}
                                </div>
                            )}

                            {question.type === "boolean" && (
                                <div>
                                    <ChoiceList
                                        choices={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" },
                                        ]}
                                        selected={responses[question.id] ? [responses[question.id]] : []}
                                        onChange={(selected) => handleChange(question.id, selected[0])}
                                    />
                                    {errors[question.id] && <InlineError message={errors[question.id]} fieldID={question.id} />}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="mt-6 flex justify-end">
                        <Button onClick={onClose} className="mr-2">
                            Skip
                        </Button>
                        <Button primary onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </FormLayout>
            </div>
        </Card>
    )
}

