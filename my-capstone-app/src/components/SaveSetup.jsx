"use client";

import React, { useState } from "react";
import { Button, Toast, ToastContainer, ToastBody, ToastHeader } from "react-bootstrap";
import TagInput from "@/components/TagInput";

function SaveSetup({ gear }) {
    // Local state to hold the setup name
    const [setupName, setSetupName] = useState("");
    // Local state to hold an array of tags
    const [tags, setTags] = useState([]);
    // Toast visibility flag for feedback after saving
    const [showToast, setShowToast] = useState(false);

    // Handler to save the setup to localStorage
    function handleSave() {
        // Prevent saving if setup name is blank
        if (!setupName.trim()) return;

        // Retrieve previously saved setups from localStorage or use empty array
        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");

        // Push new setup object to saved array
        saved.push({
            name: setupName.trim(),
            gear, // gear data passed in as prop
            tags, // selected tags
            created: new Date().toISOString(), // timestamp
        });

        // Persist updated array to localStorage
        localStorage.setItem("savedSetups", JSON.stringify(saved));

        // Clear form fields and show success toast
        setSetupName("");
        setTags([]);
        setShowToast(true);
    }

    return (
        <>
            <h5>Save Setup</h5>

            {/* Input for the setup name */}
            <input
                type="text"
                placeholder="Enter Setup Name"
                value={setupName}
                onChange={(e) => setSetupName(e.target.value)}
                className="form-control mb-1"
            />

            {/* Custom tag input component */}
            <TagInput tags={tags} setTags={setTags} />

            {/* Save button, disabled when name is empty */}
            <Button variant="outline-secondary" size="sm" onClick={handleSave} disabled={!setupName.trim()}>
                Save Setup
            </Button>

            {/* Toast Notification for success feedback */}
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
                    <ToastHeader>
                        <strong className="me-auto">Success</strong>
                    </ToastHeader>
                    <ToastBody>Your setup has been saved!</ToastBody>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default SaveSetup;
