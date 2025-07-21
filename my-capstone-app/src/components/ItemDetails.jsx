import React from "react";
import { Card, Row, Col, Image, CardHeader, CardBody } from "react-bootstrap";
import IconWithHover from "./IconWithHover";

// Main component to display detailed information about a specific item
function ItemDetails({ item }) {
    // If no item is passed in, show a fallback message
    if (!item) return <div>Item not found</div>;
    ["bladed_staff", "powered_staff", "powered_wand", "staff"];

    // Destructure relevant properties from the item object
    const {
        icon,
        wiki_name,
        wiki_url,
        _id,
        examine,
        members,
        quest_item,
        cost,
        lowalch,
        highalch,
        weight,
        tradeable,
        tradeable_on_ge,
        equipment,
        weapon,
    } = item;

    // Utility: format snake_case into readable Title Case
    function formatLabel(label) {
        return label
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    // Utility: properly format numeric bonuses (e.g., +5, -3, or —)
    function formatBonus(value) {
        return value !== undefined && value !== null ? (value >= 0 ? `+${value}` : `${value}`) : "—";
    }

    // Utility: map incomplete or missing stance data into a full fallback structure
    function getCorrectedStance(weapon_type, stance) {
        const { combat_style, attack_type, attack_style } = stance;

        if (attack_type && attack_style) {
            return { attack_type, attack_style };
        }

        const wType = weapon_type.toLowerCase();

        if (wType === "bow") {
            return { attack_type: "Standard", attack_style: combat_style };
        }
        if (wType === "crossbow" || wType === "chinchompa") {
            return { attack_type: "Heavy", attack_style: combat_style };
        }
        if (wType === "thrown") {
            return { attack_type: "Light", attack_style: combat_style };
        }
        if (wType === "blaster" || wType === "gun") {
            if (combat_style === "kick") {
                return { attack_type: "Crush", attack_style: "Aggressive" };
            }
            return { attack_type: "None", attack_style: "None" };
        }
        if (wType === "staff" || wType === "powered_staff" || wType === "powered_wand") {
            return { attack_type: "Magic", attack_style: combat_style };
        }
        if (wType === "bladed_staff") {
            if (combat_style.toLowerCase() === "spell") {
                return { attack_type: "Slash", attack_style: combat_style };
            }
        }

        return { attack_type: "None", attack_style: "None" };
    }

    return (
        <Card className="item-details-card">
            {/* Card header with icon, name, ID, and wiki link */}
            <CardHeader className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    {icon && <IconWithHover icon={icon} wiki_url={wiki_url} alt={wiki_name} />}
                    <div className="px-3">
                        <h3 className="mb-0">{wiki_name}</h3>
                        <small className="text-muted">ID: {_id}</small>
                        <small className="px-4 fst-italic">{examine}</small>
                    </div>
                </div>
                <a href={wiki_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    View on Wiki
                </a>
            </CardHeader>

            <CardBody>
                {/* Item Meta Information */}
                <h5 className="fw-bold px-2">Item Info</h5>
                <Row className="text-center mb-3">
                    <Col md={3} sm={6} className="fw-semibold border-end">
                        Members: {members ? "Yes" : "No"}
                    </Col>
                    <Col md={3} sm={6} className="fw-semibold border-end">
                        Quest Item: {quest_item ? "Yes" : "No"}
                    </Col>
                    <Col md={3} sm={6} className="fw-semibold border-end">
                        Tradeable: {tradeable ? "Yes" : "No"}
                    </Col>
                    <Col md={3} sm={6} className="fw-semibold">
                        Tradeable on GE: {tradeable_on_ge ? "Yes" : "No"}
                    </Col>
                    <Col md={3} sm={6} className="fw-semibold border-end">
                        Weight: {weight ? `${weight} kg` : "N/A"}
                    </Col>
                    <Col md={3} sm={6} className="fw-semibold border-end">
                        Slot: {formatLabel(equipment?.slot) || "N/A"}
                    </Col>
                </Row>

                {/* Economy Info */}
                <h5 className="fw-bold px-2">Economy</h5>
                <Row className="text-center mb-3">
                    <Col md={4} sm={6} className="fw-semibold border-end">
                        Cost: {cost ? cost.toLocaleString() : "N/A"} gp
                    </Col>
                    <Col md={4} sm={6} className="fw-semibold border-end">
                        Low Alch: {lowalch ? lowalch.toLocaleString() : "N/A"} gp
                    </Col>
                    <Col md={4} sm={6} className="fw-semibold">
                        High Alch: {highalch ? highalch.toLocaleString() : "N/A"} gp
                    </Col>
                </Row>

                {/* Weapon Specific Info */}
                {weapon && (
                    <>
                        <h5 className="fw-bold px-2">Weapon Info</h5>
                        <Row className="text-center mb-3">
                            <Col md={4} sm={6} className="fw-semibold border-end">
                                Attack Speed: {weapon.attack_speed}
                            </Col>
                            <Col md={4} sm={6} className="fw-semibold border-end">
                                Weapon Type: {formatLabel(weapon.weapon_type) || "N/A"}
                            </Col>
                            <Col md={4} sm={6} className="fw-semibold">
                                Stances:{" "}
                                {weapon.stances
                                    ?.map((s) => {
                                        const { attack_type, attack_style } = getCorrectedStance(weapon.weapon_type, s);
                                        return `${formatLabel(s.combat_style)}`;
                                        //return `${formatLabel(s.combat_style)} (${formatLabel(attack_type)}, ${formatLabel(attack_style)})`;
                                    })
                                    .join(", ") || "N/A"}
                            </Col>
                        </Row>
                    </>
                )}

                {/* Offensive Stats */}
                {equipment && (
                    <>
                        <h5 className="fw-bold px-2">Attack Bonuses</h5>
                        <Row className="text-center mb-3">
                            <Col md={2} sm={4} className="stat-block border-end">
                                Stab: {formatBonus(equipment.attack_stab)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Slash: {formatBonus(equipment.attack_slash)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Crush: {formatBonus(equipment.attack_crush)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Magic: {formatBonus(equipment.attack_magic)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Ranged: {formatBonus(equipment.attack_ranged)}
                            </Col>
                        </Row>

                        {/* Defensive Stats */}
                        <h5 className="fw-bold px-2">Defence Bonuses</h5>
                        <Row className="text-center mb-3">
                            <Col md={2} sm={4} className="stat-block border-end">
                                Stab: {formatBonus(equipment.defence_stab)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Slash: {formatBonus(equipment.defence_slash)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Crush: {formatBonus(equipment.defence_crush)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Magic: {formatBonus(equipment.defence_magic)}
                            </Col>
                            <Col md={2} sm={4} className="stat-block border-end">
                                Ranged: {formatBonus(equipment.defence_ranged)}
                            </Col>
                        </Row>

                        {/* Misc Bonuses */}
                        <h5 className="fw-bold px-2">Other Bonuses</h5>
                        <Row className="text-center mb-1">
                            <Col md={3} sm={6} className="stat-block border-end">
                                Melee Strength: {formatBonus(equipment.melee_strength)}
                            </Col>
                            <Col md={3} sm={6} className="stat-block border-end">
                                Ranged Strength: {formatBonus(equipment.ranged_strength)}
                            </Col>
                            <Col md={3} sm={6} className="stat-block border-end">
                                Magic Damage: {formatBonus(equipment.magic_damage)}
                            </Col>
                            <Col md={3} sm={6} className="stat-block">
                                Prayer Bonus: {formatBonus(equipment.prayer)}
                            </Col>
                        </Row>
                    </>
                )}
            </CardBody>
        </Card>
    );
}

export default ItemDetails;
