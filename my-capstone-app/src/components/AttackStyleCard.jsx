import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import classNames from "classnames";

// Component to render a selectable card representing an attack style
function AttackStyleCard({ styles = {}, weaponType, selected = false, onSelect }) {
    // Helper function to capitalize first letter of a string, or return fallback if empty
    function formatCap(str, fallback = "—") {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : fallback;
    }

    // Define weapon types that should be considered "ranged"
    const rangedTypes = ["blaster", "bow", "chinchompa", "crossbow", "gun", "thrown"];
    const isRangedWeapon = rangedTypes.includes(weaponType);

    // Determine the display name for the combat style
    const styleName = formatCap(styles.combat_style, "Unknown");

    // Check if the current style represents a magic style (based on experience string)
    const isMagicStyle = !styles.attack_type && styles.experience && styles.experience.toLowerCase().includes("magic");

    // Determine the attack type label
    const attackType = styles.attack_type ? formatCap(styles.attack_type) : isMagicStyle ? "Magic" : isRangedWeapon ? "Ranged" : "—";
    // Determine the specific attack style label
    const attackStyle = styles.attack_style
        ? formatCap(styles.attack_style)
        : isMagicStyle
        ? formatCap(styles.combat_style, "Unknown")
        : isRangedWeapon
        ? formatCap(styles.combat_style, "Unknown")
        : "—";
    // CSS classes for the card (adds highlight if selected)
    const cardClasses = classNames("style-card mb-1", {
        "border-primary": selected, // Highlight selected card
        "border-2": selected,
        border: true,
        "cursor-pointer": true, // Show pointer on hover to indicate clickability
    });

    return (
        // Bootstrap Card component representing a combat style option
        <Card className={cardClasses} style={{ height: "34px" }} onClick={onSelect}>
            <Card.Body className="py-0 px-3 d-flex align-items-center">
                <Row className="align-items-center">
                    {/* Icon representing the combat style */}
                    <Col xs="auto">
                        {
                            <Image
                                src={`/icons/styles/CombatStyles_(${weaponType},_${styles.combat_style}).png`}
                                alt={""}
                                width={20}
                                height={20}
                                fluid
                            ></Image>
                        }
                    </Col>

                    {/* Style name and meta info (attack type and style) */}
                    <Col>
                        <Card.Title className="item-name fw-semibold mb-1" style={{ fontSize: "0.8vw" }}>
                            {styleName}
                        </Card.Title>
                        <Card.Subtitle className="item-meta text-muted small" style={{ fontSize: "0.8vw" }}>
                            {attackType}, {attackStyle}
                        </Card.Subtitle>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default AttackStyleCard;
