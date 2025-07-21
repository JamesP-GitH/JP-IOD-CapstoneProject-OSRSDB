"use client";
{
    /* Placeholder for future ideas. Not currently implemented */
}
import { useEffect, useState, useContext } from "react";
import { GearContext } from "@/context/GearContext";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function SetupPage({ params }) {
    const { id } = params;
    const [setup, setSetup] = useState(null);
    const { setGear, resetGear } = useContext(GearContext);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");
        const found = saved[parseInt(id, 10)];
        if (found) {
            setSetup(found);
        }
    });
}
