import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import classNames from "classnames";

function AttackStyleCard({ styles = {}, weaponType, selected = false, onSelect }) {
    function formatCap(str, fallback = "—") {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : fallback;
    }
    const rangedTypes = ["blaster", "bow", "chinchompa", "crossbow", "gun", "thrown"];
    const isRangedWeapon = rangedTypes.includes(weaponType);
    const styleName = formatCap(styles.combat_style, "Unknown");

    const attackType = styles.attack_type ? formatCap(styles.attack_type) : isRangedWeapon ? "Ranged" : "—";

    const attackStyle = styles.attack_style ? formatCap(styles.attack_style) : isRangedWeapon ? styleName : "—";

    const cardClasses = classNames("style-card mb-1", {
        "border-primary": selected,
        "border-2": selected,
        border: true,
        "cursor-pointer": true,
    });

    return (
        <Card className={cardClasses} style={{ height: "34px" }} onClick={onSelect}>
            <Card.Body className="py-0 px-3 d-flex align-items-center">
                <Row className="align-items-center">
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
