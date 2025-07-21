import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import StatInput from "./StatInput";

// Form for editing player stats
function StatsForm({ stats, updateStat, toggleSpecialAttack }) {
    return (
        <Form>
            {/* Row for Attack and Strength levels */}
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="attackLevel" value={stats.attackLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="strengthLevel" value={stats.strengthLevel} onChange={updateStat} />
                </Col>
            </Row>

            {/* Row for Defence and Ranged levels */}
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="defenceLevel" value={stats.defenceLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="rangedLevel" value={stats.rangedLevel} onChange={updateStat} />
                </Col>
            </Row>

            {/* Row for Magic level and Hitpoints (current / max) */}
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="magicLevel" value={stats.magicLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    {/* Custom layout for Hitpoints display */}
                    <div className="d-flex align-items-center">
                        <img
                            src="/icons/Hitpoints_icon.png"
                            alt="Hitpoints"
                            style={{ width: "20px", height: "20px", marginRight: "6px" }}
                        />
                        {/* Current Hitpoints */}
                        <Form.Control
                            type="number"
                            className="no-spinner"
                            min="0"
                            max="255"
                            value={stats.hitpointsCurrent}
                            onChange={(e) => updateStat("hitpointsCurrent", e.target.value)}
                            style={{ width: "60px" }}
                        />
                        /{""}
                        {/* Base (max) Hitpoints Level */}
                        <Form.Control
                            type="number"
                            className="no-spinner"
                            min="0"
                            max="99"
                            value={stats.hitpointsLevel}
                            onChange={(e) => updateStat("hitpointsLevel", e.target.value)}
                            style={{ width: "60px" }}
                        />
                    </div>
                </Col>
            </Row>

            {/* Row for Prayer level and Special Attack toggle */}
            <Row>
                <Col xs={6} className="">
                    <StatInput statKey="prayerLevel" value={stats.prayerLevel} onChange={updateStat} />
                </Col>{" "}
                <Col xs={6} className="mb-3 d-flex align-items-center">
                    {/* Checkbox to toggle special attack use */}
                    <Form.Check
                        type="checkbox"
                        label="Special Attack"
                        checked={stats.useSpecialAttack}
                        onChange={toggleSpecialAttack}
                        style={{ fontSize: "12px" }}
                    />
                </Col>
            </Row>
        </Form>
    );
}

export default StatsForm;
