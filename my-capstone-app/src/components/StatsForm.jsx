import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import StatInput from "./StatInput";

function StatsForm({ stats, updateStat, toggleSpecialAttack }) {
    return (
        <Form>
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="attackLevel" value={stats.attackLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="strengthLevel" value={stats.strengthLevel} onChange={updateStat} />
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="defenceLevel" value={stats.defenceLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="rangedLevel" value={stats.rangedLevel} onChange={updateStat} />
                </Col>
            </Row>
            <Row>
                <Col xs={6} className="mb-3">
                    <StatInput statKey="magicLevel" value={stats.magicLevel} onChange={updateStat} />
                </Col>
                <Col xs={6} className="mb-3">
                    <div className="d-flex align-items-center">
                        <img
                            src="/icons/Hitpoints_icon.png"
                            alt="Hitpoints"
                            style={{ width: "20px", height: "20px", marginRight: "6px" }}
                        />
                        <Form.Control
                            type="number"
                            className="no-spinner"
                            min="0"
                            max="255"
                            value={stats.hitpointsCurrent}
                            onChange={(e) => updateStat("hitpointsCurrent", e.target.value)}
                            style={{ width: "60px" }}
                        />
                        /
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
            <Row>
                <Col xs={6} className="">
                    <StatInput statKey="prayerLevel" value={stats.prayerLevel} onChange={updateStat} />
                </Col>{" "}
                <Col xs={6} className="mb-3 d-flex align-items-center">
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
