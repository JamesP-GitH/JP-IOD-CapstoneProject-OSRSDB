"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import { GearContext } from "@/context/GearContext";

function MySetupsPage() {
    const [setups, setSetups] = useState([]);
    const { setGear, resetGear } = useContext(GearContext);
    const router = useRouter();

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");
        setSetups(saved);
    }, []);

    function deleteSetup(index) {
        const updated = [...setups];
        updated.splice(index, 1);
        setSetups(updated);
        localStorage.setItem("savedSetups", JSON.stringify(updated));
    }

    function loadSetup(gearData) {
        resetGear();
        Object.entries(gearData).forEach(([slot, item]) => {
            setGear(slot, item);
        });

        router.push("./gear-planner");
    }

    if (setups.length === 0) {
        return (
            <Container className="mt-4">
                <h2>My Setups</h2>
                <p>No setups saved yet.</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2>My Setups</h2>
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

                    <Row className="mt-3">
                        {Object.entries(setup.gear).map(([slot, item]) => (
                            <Col key={slot} xs={6} md={4} lg={3} className="mb-2">
                                <strong>{slot}:</strong> {item ? item.wiki_name : <em>Empty</em>}
                            </Col>
                        ))}
                    </Row>
                </Card>
            ))}
        </Container>
    );
}

export default MySetupsPage;
