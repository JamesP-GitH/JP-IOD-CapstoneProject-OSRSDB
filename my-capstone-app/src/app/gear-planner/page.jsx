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
    // Local UI states
    const [activeSlot, setActiveSlot] = useState(null); // Currently selected gear slot

    const [personalStats, setPersonalStats] = useState({});
    const [activePrayers, setActivePrayers] = useState([]);
    const [activeStyle, setActiveStyle] = useState();
    const [selectedSpellName, setSelectedSpellName] = useState(null);
    const [selectedAmmoName, setSelectedAmmoName] = useState(null);

    // Context: shared gear state and functions
    const { gear, setGear, resetGear } = useContext(GearContext);

    // Custom hook: fetches gear items based on active slot
    const { data, loading, error } = useGearItems(activeSlot);

    // Ensure item list is always an array
    const items = useMemo(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    // Determine if current weapon is two-handed
    const isTwoHanded = gear.weapon?.equipment?.slot === "2h";

    // Handle selection of a gear item from the list
    function handleItemSelect(item) {
        if (!activeSlot) return;

        // Set the selected item into the active slot
        setGear(activeSlot, item);

        // If weapon is selected and it's a 2h weapon, clear shield slot
        if (activeSlot === "weapon" && item?.equipment?.slot === "2h") {
            setGear("shield", null);
        }
    }

    // Handle changes from the personal stats panel
    function handleStyleChange(style, spell, ammo) {
        setActiveStyle(style);
        setSelectedSpellName(spell || null);
        setSelectedAmmoName(ammo || null);
    }

    // Clear an individual gear slot
    function clearSlot(slot) {
        setGear(slot, null);
    }

    return (
        <>
            <Container className="p-1">
                <Row className="p-1">
                    {/* Left column: Stats input panel */}
                    <Col md={4} sx={12}>
                        <PersonalStatsPanel
                            onStatsChange={setPersonalStats}
                            onPrayersChange={setActivePrayers}
                            onStyleChange={handleStyleChange}
                            activeStyle={activeStyle}
                            selectedSpellName={selectedSpellName}
                            selectedAmmoName={selectedAmmoName}
                        />
                    </Col>

                    {/* Middle column: Gear grid */}
                    <Col md={4} sx={12}>
                        <Container className="mt-4 ">
                            {/* Clear all gear button */}
                            <Row className="mt-1 mb-2 d-flex justify-content-end">
                                <Col className="">
                                    <Button variant="outline-secondary" size="sm" onClick={resetGear}>
                                        Clear All
                                    </Button>
                                </Col>
                            </Row>

                            {/* Gear grid rows */}
                            {/* Row 1: Head */}
                            <Row className="mb-2">
                                {/* gear slots row 1 */}
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="head" item={gear.head} onClick={() => setActiveSlot("head")} onClear={clearSlot} />
                                </Col>
                            </Row>

                            {/* Row 2: Cape, Neck, Ammo */}
                            <Row className="mb-2 mx-2 justify-content-around d-flex p-0">
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

                            {/* Row 3: Weapon, Body, Shield */}
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

                            {/* Row 4: Legs */}
                            <Row className="mb-2">
                                <Col className="d-flex justify-content-center">
                                    <GearSlot slot="legs" item={gear.legs} onClick={() => setActiveSlot("legs")} onClear={clearSlot} />
                                </Col>
                            </Row>

                            {/* Row 5: Hands, Feet, Ring */}
                            <Row className="mb-2">
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

                    {/* Right column: Item list for active slot */}
                    <Col md={4} sx={12} style={{ height: "360px", overflowY: "auto" }}>
                        <ItemList slot={activeSlot} items={items || []} loading={loading} error={error} onItemClick={handleItemSelect} />
                    </Col>
                </Row>

                <hr />

                {/* Stats summary and save button section */}
                <Row className="mt-3">
                    <Col md={8}>
                        <GearStatsSummary
                            personalStats={personalStats}
                            activePrayers={activePrayers}
                            activeStyle={activeStyle}
                            selectedSpellName={selectedSpellName}
                            selectedAmmoName={selectedAmmoName}
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
