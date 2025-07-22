"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Row, Col, Button, Badge, ToastContainer, Toast, ToastHeader, ToastBody } from "react-bootstrap";
import { GearContext } from "@/context/GearContext";

function MySetupsPage() {
    // State for saved setups and showing toast messages
    const [setups, setSetups] = useState([]);
    const [showToast, setShowToast] = useState(false);

    // Access gear context methods
    const { setGear, resetGear } = useContext(GearContext);

    // Next.js router
    const router = useRouter();

    // Load saved setups from localStorage when the component mounts
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");
        setSetups(saved);
    }, []);

    // Delete a setup by index, update state and localStorage
    function deleteSetup(index) {
        const updated = [...setups];
        updated.splice(index, 1);
        setSetups(updated);
        localStorage.setItem("savedSetups", JSON.stringify(updated));
    }

    // Load a setup into the gear context and navigate to the planner
    function loadSetup(gearData) {
        resetGear(); // Clear current gear
        Object.entries(gearData).forEach(([slot, item]) => {
            setGear(slot, item); // Set gear slot-by-slot
        });

        router.push("./gear-planner"); // Navigate to gear planner page
    }

    // Utility to capitalize first letter of a string (for display)
    function formatCapital(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
    }

    // Render message when no setups are saved
    if (setups.length === 0) {
        return (
            <Container className="mt-4">
                <h2>My Setups</h2>
                <p>No setups saved yet.</p>
            </Container>
        );
    }

    return (
        <>
            <Container className="mt-4">
                <h2>My Setups</h2>

                {/* Loop through saved setups and render them */}
                {setups.map((setup, idx) => (
                    <Card key={idx} className="mb-3 p-3">
                        <Row className="align-items-center">
                            <Col>
                                <h5>{setup.name}</h5>
                                <div className="mt-1">
                                    {setup.tags.map((tag, i) => (
                                        <Badge key={i} bg="info" className="me-1">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </Col>
                            <Col xs="auto">
                                <Button variant="primary" size="sm" onClick={() => loadSetup(setup.gear)} className="me-2">
                                    Load
                                </Button>
                                <Button variant="danger" size="sm" onClick={() => deleteSetup(idx)}>
                                    Delete
                                </Button>
                            </Col>
                        </Row>

                        {/* Display each gear item in the setup */}
                        <Row className="mt-3">
                            {Object.entries(setup.gear).map(([slot, item]) => (
                                <Col key={slot} xs={6} md={4} lg={4} className="mb-2">
                                    <strong>{formatCapital(slot)}:</strong> {item ? item.wiki_name : <em>Empty</em>}
                                </Col>
                            ))}
                        </Row>
                    </Card>
                ))}
            </Container>

            {/* Toast Notification */}
            <ToastContainer position="top-center" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
                    <ToastHeader>
                        <strong className="me-auto">Success</strong>
                    </ToastHeader>
                    <ToastBody>Your setup has been loaded!</ToastBody>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default MySetupsPage;
