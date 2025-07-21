import React, { useState, useEffect } from "react";
import { Card, Container, Tabs, Tab, Image } from "react-bootstrap";
import PrayerSelector from "./PrayerSelector";
import StatsForm from "./StatsForm";
import AttackStyleSelector from "./AttackStyleSelector";

// Component handles tabs for panel and passes values from nested components
function PersonalStatsPanel({ onStatsChange, onPrayersChange, onStyleChange, activeStyle, selectedSpellName, selectedAmmoName }) {
    // Initialize component state to hold all personal stats and a special attack flag
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

    // Effect to notify parent component of initial stats on first render
    useEffect(() => {
        if (onStatsChange) onStatsChange(stats);
    }, []); // Empty dependency array means runs once on mount

    // Update a specific stat by key, convert value to Number, update state and notify parent
    function updateStat(statKey, value) {
        const updated = {
            ...stats,
            [statKey]: Number(value),
        };
        setStats(updated);
        onStatsChange && onStatsChange(updated);
    }

    // Toggle special attack usage boolean, update state and notify parent
    function toggleSpecialAttack() {
        const newStats = { ...stats, useSpecialAttack: !stats.useSpecialAttack };
        setStats(newStats);
        onStatsChange && onStatsChange(newStats);
    }

    // Handle prayer changes and notify parent
    function handlePrayersChange(activePrayers) {
        onPrayersChange && onPrayersChange(activePrayers);
    }

    // Tab keys to avoid hardcoding strings multiple times
    const TAB_KEYS = {
        STATS: "statsForm",
        PRAYER: "prayerSelector",
        STYLE: "attackStyleSelector",
    };

    return (
        // Container to hold the entire stats panel with padding and margin
        <Container className="p-2 mb-1">
            {/* Tabs component with default active tab set to the stats form */}
            <Tabs defaultActiveKey={TAB_KEYS.STATS} id="uncontrolled-tab" className="mb-3">
                {/* Stats tab showing the user's personal stats form */}
                <Tab eventKey={TAB_KEYS.STATS} title={<Image src="/icons/Stats_icon.png" />}>
                    <Card.Title className="mb-2">Personal Stats</Card.Title>
                    {/* Pass current stats and update/toggle handlers to the StatsForm component */}
                    <StatsForm stats={stats} updateStat={updateStat} toggleSpecialAttack={toggleSpecialAttack} />
                </Tab>

                {/* Prayer selection tab */}
                <Tab eventKey={TAB_KEYS.PRAYER} title={<Image src="/icons/Prayer_icon.png" />}>
                    <Card.Title className="mt-2 mb-1">Prayers</Card.Title>
                    <PrayerSelector onPrayersChange={handlePrayersChange} />
                </Tab>

                {/* Attack style selection tab */}
                <Tab eventKey={TAB_KEYS.STYLE} title={<Image src="/icons/Combat_icon.png" />}>
                    <Card.Title className="mb-0">Attack Style</Card.Title>
                    {/* Pass attack style related props and change handler down */}
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
