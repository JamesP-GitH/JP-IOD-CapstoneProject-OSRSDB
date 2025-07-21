import React, { useState, useEffect } from "react";
import { Card, Container, Tabs, Tab, Image } from "react-bootstrap";
import PrayerSelector from "./PrayerSelector";
import StatsForm from "./StatsForn";
import AttackStyleSelector from "./AttackStyleSelector";

function PersonalStatsPanel({ onStatsChange, onPrayersChange, onStyleChange, activeStyle, selectedSpellName, selectedAmmoName }) {
    const [stats, setStats] = useState({
        hitpointsCurrent: 99,
        hitpointsLevel: 99,
        attackLevel: 99,
        strengthLevel: 99,
        defenceLevel: 99,
        rangedLevel: 99,
        magicLevel: 99,
        prayerLevel: 99,
        useSpecialAttack: false,
    });

    useEffect(() => {
        if (onStatsChange) onStatsChange(stats);
    }, []);

    function updateStat(statKey, value) {
        const updated = {
            ...stats,
            [statKey]: Number(value),
        };
        setStats(updated);
        onStatsChange && onStatsChange(updated);
    }

    function toggleSpecialAttack() {
        const newStats = { ...stats, useSpecialAttack: !stats.useSpecialAttack };
        setStats(newStats);
        onStatsChange && onStatsChange(newStats);
    }

    function handlePrayersChange(activePrayers) {
        onPrayersChange && onPrayersChange(activePrayers);
    }

    const TAB_KEYS = {
        STATS: "statsForm",
        PRAYER: "prayerSelector",
        STYLE: "attackStyleSelector",
    };

    return (
        <Container className="p-2 mb-1">
            <Tabs defaultActiveKey={TAB_KEYS.STATS} id="uncontrolled-tab" className="mb-3">
                <Tab eventKey={TAB_KEYS.STATS} title={<Image src="/icons/Stats_icon.png" />}>
                    <Card.Title className="mb-2">Personal Stats</Card.Title>
                    <StatsForm stats={stats} updateStat={updateStat} toggleSpecialAttack={toggleSpecialAttack} />
                </Tab>
                <Tab eventKey={TAB_KEYS.PRAYER} title={<Image src="/icons/Prayer_icon.png" />}>
                    <Card.Title className="mt-2 mb-1">Prayers</Card.Title>
                    <PrayerSelector onPrayersChange={handlePrayersChange} />
                </Tab>
                <Tab eventKey={TAB_KEYS.STYLE} title={<Image src="/icons/Combat_icon.png" />}>
                    <Card.Title className="mb-0">Attack Style</Card.Title>
                    <AttackStyleSelector
                        onStyleChange={onStyleChange}
                        activeStyle={activeStyle}
                        selectedSpellName={selectedSpellName}
                        selectedAmmoName={selectedAmmoName}
                    />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default PersonalStatsPanel;
