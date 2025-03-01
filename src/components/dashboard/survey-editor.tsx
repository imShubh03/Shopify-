"use client";

import { useState, useCallback } from "react";
import {
    Card,
    FormLayout,
    TextField,
    Select,
    Button,
    Banner,
} from "@shopify/polaris";
import { GripVertical, Trash2, Plus } from "lucide-react"; // Replaced Shopify icons

export function SurveyEditor() {
    const [title, setTitle] = useState("Cart Feedback Survey");
    const [description, setDescription] = useState(
        "Help us improve your shopping experience by answering a few quick questions."
    );
    const [questions, setQuestions] = useState([
        {
            id: "q1",
            text: "How satisfied are you with your shopping experience?",
            type: "rating",
            required: true,
        },
        {
            id: "q2",
            text: "What is the primary reason for your purchase today?",
            type: "multiple_choice",
            options: ["Personal use", "Gift", "Business", "Other"],
            required: true,
        },
        {
            id: "q3",
            text: "Any additional comments about your experience?",
            type: "text",
            required: false,
        },
    ]);

    const handleAddQuestion = useCallback(() => {
        setQuestions([
            ...questions,
            {
                id: `q${questions.length + 1}`,
                text: "New Question",
                type: "multiple_choice",
                options: ["Option 1", "Option 2", "Option 3"],
                required: false,
            },
        ]);
    }, [questions]);

    const handleQuestionChange = useCallback(
        (id: string, field: string, value: any) => {
            setQuestions((prevQuestions) =>
                prevQuestions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
            );
        },
        []
    );

    const handleRemoveQuestion = useCallback((id: string) => {
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id));
    }, []);

    return (
        <div>
            <Banner title="Survey Editor" status="info">
                <p>
                    Customize your cart survey below. Changes will be reflected on
                    your store's cart page after saving.
                </p>
            </Banner>

            <div className="mt-6">
                <FormLayout>
                    <TextField
                        label="Survey Title"
                        value={title}
                        onChange={setTitle}
                        autoComplete="off"
                    />
                    <TextField
                        label="Survey Description"
                        value={description}
                        onChange={setDescription}
                        multiline={3}
                        autoComplete="off"
                    />
                </FormLayout>
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Survey Questions</h3>
                    <Button onClick={handleAddQuestion} icon={<Plus size={16} />}>
                        Add Question
                    </Button>
                </div>

                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <Card key={question.id}>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="mr-3 text-gray-400">
                                            <GripVertical size={18} />
                                        </div>
                                        <span className="font-medium">
                                            Question {index + 1}
                                        </span>
                                    </div>
                                    <Button
                                        plain
                                        destructive
                                        icon={<Trash2 size={16} />}
                                        onClick={() => handleRemoveQuestion(question.id)}
                                        accessibilityLabel="Remove question"
                                    />
                                </div>

                                <FormLayout>
                                    <TextField
                                        label="Question Text"
                                        value={question.text}
                                        onChange={(value) =>
                                            handleQuestionChange(question.id, "text", value)
                                        }
                                        autoComplete="off"
                                    />

                                    <Select
                                        label="Question Type"
                                        options={[
                                            { label: "Multiple Choice", value: "multiple_choice" },
                                            { label: "Rating", value: "rating" },
                                            { label: "Text", value: "text" },
                                            { label: "Yes/No", value: "boolean" },
                                        ]}
                                        value={question.type}
                                        onChange={(value) =>
                                            handleQuestionChange(question.id, "type", value)
                                        }
                                    />

                                    {question.type === "multiple_choice" &&
                                        question.options && (
                                            <div>
                                                <p className="mb-2 font-medium">Options</p>
                                                {question.options.map((option, optIndex) => (
                                                    <div
                                                        key={optIndex}
                                                        className="flex items-center mb-2"
                                                    >
                                                        <TextField
                                                            label={`Option ${optIndex + 1}`}
                                                            labelHidden
                                                            value={option}
                                                            onChange={(value) => {
                                                                const newOptions = [
                                                                    ...question.options,
                                                                ];
                                                                newOptions[optIndex] = value;
                                                                handleQuestionChange(
                                                                    question.id,
                                                                    "options",
                                                                    newOptions
                                                                );
                                                            }}
                                                            autoComplete="off"
                                                        />
                                                        <Button
                                                            plain
                                                            destructive
                                                            icon={<Trash2 size={16} />}
                                                            onClick={() => {
                                                                const newOptions =
                                                                    question.options.filter(
                                                                        (_, i) => i !== optIndex
                                                                    );
                                                                handleQuestionChange(
                                                                    question.id,
                                                                    "options",
                                                                    newOptions
                                                                );
                                                            }}
                                                            accessibilityLabel="Remove option"
                                                        />
                                                    </div>
                                                ))}
                                                <Button
                                                    plain
                                                    onClick={() => {
                                                        const newOptions = [
                                                            ...question.options,
                                                            `Option ${question.options.length + 1}`,
                                                        ];
                                                        handleQuestionChange(
                                                            question.id,
                                                            "options",
                                                            newOptions
                                                        );
                                                    }}
                                                >
                                                    Add option
                                                </Button>
                                            </div>
                                        )}

                                    <div className="flex items-center">
                                        <label className="mr-2">Required</label>
                                        <input
                                            type="checkbox"
                                            checked={question.required}
                                            onChange={(e) =>
                                                handleQuestionChange(
                                                    question.id,
                                                    "required",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                </FormLayout>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <Button primary>Save Survey</Button>
            </div>
        </div>
    );
}
