"use client";

import React, { useState, useMemo, useContext } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import GearSlot from "@/components/GearSlot";
import useGearItems from "@/hooks/useGearItems";
import ItemList from "@/components/ItemList";
import { GearContext } from "@/context/GearContext";
import GearStatsSummary from "@/components/GearStatsSummary";
import PersonalStatsPanel from "@/components/PersonalStatsPanel";
import SaveSetup from "@/components/SaveSetup";

function GearPlanner() {
    const [activeSlot, setActiveSlot] = useState(null);
    const { data, loading, error } = useGearItems(activeSlot);
    const { gear, setGear, resetGear } = useContext(GearContext);
    const [personalStats, setPersonalStats] = useState({});
    const [activePrayers, setActivePrayers] = useState([]);
    const [activeStyle, setActiveStyle] = useState();
    const [selectedSpellName, setSelectedSpellName] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [setupName, setSetupName] = useState("");
    const [tags, setTags] = useState("");

    const items = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);
    const isTwoHanded = gear.weapon?.equipment?.slot === "2h";

    function handleItemSelect(item) {
        if (!activeSlot) return;

        // Set the selected item into the active slot
        setGear(activeSlot, item);

        // If weapon is selected and it's a 2h weapon, clear shield slot
        if (activeSlot === "weapon" && item?.equipment?.slot === "2h") {
            setGear("shield", null);
        }
    }

    function handleStyleChange(style, spell) {
        setActiveStyle(style);
        setSelectedSpellName(spell || null);
    }

    function clearSlot(slot) {
        setGear(slot, null);
    }

    function handleSaveSetup() {
        if (!setupName) return alert("Please enter a name for your gear setup.");

        const saved = JSON.parse(localStorage.getItem("savedSetups") || "[]");

        saved.push({
            name: setupName.trim(),
            tags: tags
                .split(",")
                .map((tag) => tag.trim().toLowerCase())
                .filter(Boolean),
            gear,
            created: new Date().toISOString(),
        });

        localStorage.setItem("savedSetups", JSON.stringify(saved));
        setSetupName("");
        setTags("");
        setShowToast(true);
    }

    return (
        <>
            <Container className="p-1">
                <Row className="p-1">
                    <Col md={4} sx={12}>
                        <PersonalStatsPanel
                            onStatsChange={setPersonalStats}
                            onPrayersChange={setActivePrayers}
                            onStyleChange={handleStyleChange}
                            activeStyle={activeStyle}
                            selectedSpellName={selectedSpellName}
                        />
                    </Col>
                    <Col md={4} sx={12}>
                        <Container className="mt-4 ">
                            <Row className="mt-1 mb-2 d-flex justify-content-end">
                                <Col className="">
                                    <Button variant="outline-secondary" size="sm" onClick={resetGear}>
                                        Clear All
                                    </Button>
                                </Col>
                            </Row>
                            {/* gear slots for selection, 5 rows like game*/}
                            <Row className="mb-2">
                                {/* gear slots row 1 */}
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="head" item={gear.head} onClick={() => setActiveSlot("head")} onClear={clearSlot} />
                                </Col>
                            </Row>
                            <Row className="mb-2 mx-2 justify-content-around d-flex p-0">
                                {/* gear slots row 2 */}
                                <Col className="d-flex justify-content-end p-1">
                                    <GearSlot slot="cape" item={gear.cape} onClick={() => setActiveSlot("cape")} onClear={clearSlot} />
                                </Col>
                                <Col className="d-flex justify-content-center p-1">
                                    <GearSlot slot="neck" item={gear.neck} onClick={() => setActiveSlot("neck")} onClear={clearSlot} />
                                </Col>
                                <Col className="d-flex justify-content-start p-1">
                                    <GearSlot slot="ammo" item={gear.ammo} onClick={() => setActiveSlot("ammo")} onClear={clearSlot} />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                {/* gear slots row 3 */}
                                <Col className="d-flex justify-content-center">
                                    <GearSlot
                                        slot="weapon"
                                        item={gear.weapon}
                                        onClick={() => setActiveSlot("weapon")}
                                        onClear={clearSlot}
                                    />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="body" item={gear.body} onClick={() => setActiveSlot("body")} onClear={clearSlot} />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <GearSlot
                                        slot="shield"
                                        item={gear.shield}
                                        onClick={() => setActiveSlot("shield")}
                                        onClear={clearSlot}
                                        disabled={isTwoHanded}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                {/* gear slots row 4 */}
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="legs" item={gear.legs} onClick={() => setActiveSlot("legs")} onClear={clearSlot} />
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                {/* gear slots row 5 */}
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="hands" item={gear.hands} onClick={() => setActiveSlot("hands")} onClear={clearSlot} />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="feet" item={gear.feet} onClick={() => setActiveSlot("feet")} onClear={clearSlot} />
                                </Col>
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="ring" item={gear.ring} onClick={() => setActiveSlot("ring")} onClear={clearSlot} />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={4} sx={12} style={{ height: "360px", overflowY: "auto" }}>
                        <ItemList slot={activeSlot} items={items || []} loading={loading} error={error} onItemClick={handleItemSelect} />
                    </Col>
                    {/*list of slot items to be selected from shown here in this col*/}
                </Row>
                <hr />
                <Row className="mt-3">
                    <Col md={8}>
                        <GearStatsSummary
                            personalStats={personalStats}
                            activePrayers={activePrayers}
                            activeStyle={activeStyle}
                            selectedSpellName={selectedSpellName}
                        />
                    </Col>
                    <Col>
                        <SaveSetup gear={gear} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default GearPlanner;
