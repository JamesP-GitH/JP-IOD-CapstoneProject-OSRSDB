import React, { useState, useEffect } from "react";
import { Image, Button, Container, Row, Col } from "react-bootstrap";

// Special prayers that are mutually exclusive with others
const specialPrayers = ["Chivalry", "Piety", "Rigour", "Augury"];

// Prayer groups by effect type — each group is mutually exclusive within itself and with certain others
const defenseBasics = ["Thick_Skin", "Rock_Skin", "Steel_Skin"];
const attackBasics = ["Clarity_of_Thought", "Improved_Reflexes", "Incredible_Reflexes"];
const strengthBasics = ["Burst_of_Strength", "Superhuman_Strength", "Ultimate_Strength"];
const rangedBasics = ["Sharp_Eye", "Hawk_Eye", "Eagle_Eye", "Deadeye"];
const magicBasics = ["Mystic_Will", "Mystic_Lore", "Mystic_Might", "Mystic_Vigour"];

// Predefined display order for prayers in the UI grid
const prayerOrder = [
    "Burst_of_Strength",
    "Clarity_of_Thought",
    "Sharp_Eye",
    "Mystic_Will",
    "Superhuman_Strength",
    "Improved_Reflexes",
    "Hawk_Eye",
    "Mystic_Lore",
    "Ultimate_Strength",
    "Incredible_Reflexes",
    "Eagle_Eye",
    "Mystic_Might",
    "Thick_Skin",
    "Chivalry",
    "Deadeye",
    "Mystic_Vigour",
    "Rock_Skin",
    "Piety",
    "Rigour",
    "Augury",
    "Steel_Skin",
];

function PrayerSelector({ onPrayersChange }) {
    const [activePrayers, setActivePrayers] = useState([]);

    // Notify parent any time activePrayers updates
    useEffect(() => {
        if (typeof onPrayersChange === "function") {
            onPrayersChange(activePrayers);
        }
    }, [activePrayers, onPrayersChange]);

    function togglePrayer(prayer) {
        setActivePrayers((current) => {
            const isActive = current.includes(prayer);
            let updated = [];

            // If it's a special prayer, only one can be active at a time
            if (specialPrayers.includes(prayer)) {
                updated = isActive ? current.filter((p) => p !== prayer) : [prayer];
                return updated;
            }

            // If a special prayer is active, remove it when another prayer is clicked
            if (current.some((p) => specialPrayers.includes(p))) {
                current = current.filter((p) => !specialPrayers.includes(p));
            }

            // Define prayer groups
            const groupMap = {
                defense: defenseBasics,
                attack: attackBasics,
                strength: strengthBasics,
                ranged: rangedBasics,
                magic: magicBasics,
            };

            // Identify which group the clicked prayer belongs to
            let group = Object.entries(groupMap).find(([, list]) => list.includes(prayer))?.[0];
            if (!group) return current;

            // If already active, just remove it
            if (isActive) {
                updated = current.filter((p) => p !== prayer);
            } else {
                // Otherwise, deactivate incompatible prayers before activating the new one
                updated = current.filter((p) => {
                    if (group === "ranged" || group === "magic") {
                        // Ranged/magic are mutually exclusive with each other and also with attack/strength
                        return (
                            !rangedBasics.includes(p) &&
                            !magicBasics.includes(p) &&
                            !attackBasics.includes(p) &&
                            !strengthBasics.includes(p)
                        );
                    }
                    if (group === "attack" || group === "strength") {
                        // Attack/strength are mutually exclusive with ranged/magic and each other
                        return !rangedBasics.includes(p) && !magicBasics.includes(p) && !groupMap[group].includes(p);
                    }
                    if (group === "defense") {
                        return !defenseBasics.includes(p);
                    }
                    return true;
                });

                // Activate the selected prayer
                updated.push(prayer);
            }

            return updated;
        });
    }
    
    // Build 2D array of prayers to display in a grid layout
    const columnsPerRow = 4;
    const rows = [];
    for (let i = 0; i < prayerOrder.length; i += columnsPerRow) {
        rows.push(prayerOrder.slice(i, i + columnsPerRow));
    }

    return (
        <Container className="text-center justify-content-center" style={{ maxWidth: "250px", marginTop: "12px" }}>
            {rows.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-0 justify-content-between">
                    {row.map((prayer) => (
                        <Col key={prayer} xs="auto" className="p-0">
                            <Button
                                variant="light"
                                onClick={() => togglePrayer(prayer)}
                                title={prayer}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    padding: 0,
                                    borderRadius: "6px",
                                    border: activePrayers.includes(prayer) ? "2px solid #4caf50" : "2px solid transparent",
                                    backgroundColor: activePrayers.includes(prayer) ? "#d4edda" : "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image
                                    src={`/icons/prayers/${prayer}.png`}
                                    alt={prayer}
                                    width={24}
                                    height={24}
                                    style={{ objectFit: "contain" }}
                                />
                            </Button>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

export default PrayerSelector;
