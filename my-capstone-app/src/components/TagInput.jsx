"use client";

import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";

function TagInput({ tags, setTags, label = "Tags" }) {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            const newTag = input.trim().toLowerCase();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInput("");
        }
    };

    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, idx) => idx !== indexToRemove));
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                placeholder="Type a tag and press Enter or comma"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <div className="mt-2 d-flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <Badge key={idx} bg="secondary">
                        {tag}{" "}
                        <span onClick={() => removeTag(idx)} style={{ cursor: "pointer", marginLeft: "6px" }}>
                            ×
                        </span>
                    </Badge>
                ))}
            </div>
        </Form.Group>
    );
}

export default TagInput;
