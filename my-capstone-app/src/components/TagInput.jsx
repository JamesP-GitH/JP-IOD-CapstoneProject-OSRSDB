"use client";

import React, { useState } from "react";
import { Form, Badge } from "react-bootstrap";

// A reusable input for entering and displaying tags
function TagInput({ tags, setTags }) {
    const [input, setInput] = useState(""); // Local state for the current input value

    // Handles tag addition when the user presses Enter or comma
    const handleKeyDown = (e) => {
        // If Enter or comma is pressed and input isn't empty
        if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault(); // Prevent default form submission or unwanted comma
            const newTag = input.trim().toLowerCase(); // Normalize tag text
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]); // Add new tag if it's not a duplicate
            }
            setInput(""); // Clear input after adding
        }
    };

    // Removes a tag by its index
    const removeTag = (indexToRemove) => {
        setTags(tags.filter((_, idx) => idx !== indexToRemove));
    };

    return (
        <Form.Group className="mb-2">
            {/* Input field for typing tags */}
            <Form.Control
                type="text"
                placeholder="Type a tag and press Enter or comma"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Render all tags as Bootstrap badges */}
            <div className="mt-2 d-flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <Badge key={idx} bg="secondary">
                        {tag} {""}
                        {/* '×' icon to remove the tag */}
                        <span onClick={() => removeTag(idx)} style={{ cursor: "pointer", marginLeft: "6px" }}>
                            x
                        </span>
                    </Badge>
                ))}
            </div>
        </Form.Group>
    );
}

export default TagInput;
