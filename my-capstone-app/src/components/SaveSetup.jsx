"use client";

import React, { useState } from "react";
import { Button, Toast, ToastContainer, ToastBody, ToastHeader } from "react-bootstrap";
import TagInput from "@/components/TagInput";

function SaveSetup({ gear }) {
    const [setupName, setSetupName] = useState("");
    const [tags, setTags] = useState([]);
    const [showToast, setShowToast] = useState(false);

    function handleSave() {
        if (!setupName.trim()) return;

        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");

        saved.push({
            name: setupName.trim(),
            gear,
            tags,
            created: new Date().toISOString(),
        });

        localStorage.setItem("savedSetups", JSON.stringify(saved));
        setSetupName("");
        setTags([]);
        setShowToast(true);
    }

    return (
        <>
            <h5>Save Setup</h5>
            <input
                type="text"
                placeholder="Enter Setup Name"
                value={setupName}
                onChange={(e) => setSetupName(e.target.value)}
                className="form-control mb-1"
            />

            <TagInput tags={tags} setTags={setTags} />

            <Button variant="outline-secondary" size="sm" onClick={handleSave} disabled={!setupName.trim()}>
                Save Setup
            </Button>

            {/* Toast Notification */}
            <ToastContainer position="top-end" className="p-3">
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
