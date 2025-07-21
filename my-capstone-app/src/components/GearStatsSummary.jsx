import React, { useContext, useMemo } from "react";
import { Row, Col } from "react-bootstrap";
import { GearContext } from "@/context/GearContext";
import MaxHitCalculator from "./MaxHitCalculator";
import WeaponTypes from "../utils/WeaponTypesUtils";

// Component to display a summary of total gear bonuses and calculated max hit
function GearStatsSummary({ personalStats, activePrayers, activeStyle, selectedSpellName, selectedAmmoName }) {
    // Access all currently equipped gear
    const { gear } = useContext(GearContext);

    // Normalize the weapon type using a utility (e.g., turn "staff" into "magic")
    const weaponType = WeaponTypes(gear.weapon?.weapon.weapon_type || "unarmed");

    // Define all possible bonuses we're tracking, initialized to zero
    const initialStats = {
        attack_stab: 0,
        attack_slash: 0,
        attack_crush: 0,
        attack_magic: 0,
        attack_ranged: 0,
        defence_stab: 0,
        defence_slash: 0,
        defence_crush: 0,
        defence_magic: 0,
        defence_ranged: 0,
        melee_strength: 0,
        ranged_strength: 0,
        magic_damage: 0,
        prayer: 0,
        attack_speed: 0,
    };

    // Calculate the sum of all stat bonuses from equipped items
    const totalStats = useMemo(() => {
        return Object.values(gear).reduce(
            (accumulatedValue, item) => {
                const eq = item?.equipment;
                if (eq) {
                    // Add each stat from the item to the accumulated total
                    for (const key in initialStats) {
                        accumulatedValue[key] += eq[key] || 0;
                    }
                }

                // Special handling: if the item is a weapon and has attack_speed defined, store it
                if (eq?.slot === "weapon" && item.weapon?.attack_speed !== undefined) {
                    accumulatedValue.attack_speed = item.weapon.attack_speed;
                }

                return accumulatedValue;
            },
            { ...initialStats } // Start with a copy of the initial stats
        );
    }, [gear]);

    // Helper function to format bonuses as strings with +/− signs
    function formatBonus(value) {
        return value !== undefined && value !== null ? (value >= 0 ? `+${value}` : `${value}`) : "—";
    }

    return (
        <div className="p-2 mx-4">
            <h5>Gear Stat Summary</h5>
            <Row className="small">
                {/* Attack bonuses */}
                <Col xs={12} md={3}>
                    <strong>Attack</strong>
                    <div>Stab: {formatBonus(totalStats.attack_stab)}</div>
                    <div>Slash: {formatBonus(totalStats.attack_slash)}</div>
                    <div>Crush: {formatBonus(totalStats.attack_crush)}</div>
                    <div>Magic: {formatBonus(totalStats.attack_magic)}</div>
                    <div>Ranged: {formatBonus(totalStats.attack_ranged)}</div>
                </Col>

                {/* Defence bonuses */}
                <Col xs={12} md={3}>
                    <strong>Defence</strong>
                    <div>Stab: {formatBonus(totalStats.defence_stab)}</div>
                    <div>Slash: {formatBonus(totalStats.defence_slash)}</div>
                    <div>Crush: {formatBonus(totalStats.defence_crush)}</div>
                    <div>Magic: {formatBonus(totalStats.defence_magic)}</div>
                    <div>Ranged: {formatBonus(totalStats.defence_ranged)}</div>
                </Col>

                {/* Other bonuses like strength, prayer, attack speed */}
                <Col xs={12} md={3}>
                    <strong>Other</strong>
                    <div>Strength: {formatBonus(totalStats.melee_strength)}</div>
                    <div>Ranged Strength: {formatBonus(totalStats.ranged_strength)}</div>
                    <div>Magic Damage: {formatBonus(totalStats.magic_damage)}%</div>
                    <div>Prayer: {formatBonus(totalStats.prayer)}</div>
                    <div>Attack Speed: {totalStats.attack_speed}</div>
                </Col>

                {/* DPS section using MaxHitCalculator component */}
                <Col>
                    <strong>DPS</strong>
                    <MaxHitCalculator
                        strengthLevel={(personalStats && personalStats.strengthLevel) || 99}
                        rangedLevel={personalStats.rangedLevel}
                        magicLevel={personalStats.magicLevel}
                        strengthBonus={totalStats.melee_strength || 0}
                        rangedStrengthBonus={totalStats.ranged_strength}
                        magicDamageBonus={totalStats.magic_damage}
                        weaponType={weaponType}
                        activePrayers={activePrayers || []}
                        activeStyle={activeStyle}
                        selectedSpellName={selectedSpellName || ""}
                        selectedAmmoName={selectedAmmoName || ""}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default GearStatsSummary;
