import React from "react";
import PrayerBonuses from "./PrayerBonuses";
import { getSpellDamage } from "@/utils/SpellbookUtils";
import { getDartDamage } from "@/utils/DartUtils";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function MaxHitCalculator({
    strengthLevel = 99,
    rangedLevel = 99,
    magicLevel = 99,
    strengthBonus = 0,
    equipmentRangedBonus = 0,
    rangedStrengthBonus = 0,
    magicDamageBonus = 0,
    weaponType,
    activePrayers = [],
    activeStyle,
    selectedSpellName,
    selectedAmmoName,
}) {
    const meleeStyleBonuses = {
        aggressive: 3,
        controlled: 1,
        accurate: 0,
        defensive: 0,
    };

    const rangedStyleBonuses = {
        accurate: 3,
    };

    const bonuses = PrayerBonuses(activePrayers);
    const meleeStyleBonus = meleeStyleBonuses[activeStyle?.attack_style] || 0;
    const rangedStyleBonus = rangedStyleBonuses[activeStyle?.combat_style] || 0;
    const voidBonus = 1; //placeholder

    const dartBonus = getDartDamage(selectedAmmoName);

    const specialBonus = 1; //placeholder
    const potionBonus = 0; //placeholder
    const gearBonus = 1; //placeholder
    const chaosGauntletBoost = 0; //placeholder

    const baseMaxMagicDamage = getSpellDamage(selectedSpellName) || Math.abs(magicLevel / 3 + 1);
    const visibleBonuses = magicDamageBonus / 100;
    console.log(visibleBonuses);
    const voidMagicBonus = 0; //placeholder
    const shadowBonus = 1; //placeholder
    const salveBonus = 0; //placeholder
    const avariceBonus = 0; //placeholder
    const smokeBattlestaffBonus = 0; //placeholder
    const virtusRobesAncientBonus = 0; //placeholder
    const slayerBonus = 0; //placeholder
    const sceptreWildernessBonus = 0; //placeholder
    const accursedScepterSpecialBonus = 0; //placeholder
    const tomesBonus = 0; //placeholder
    const markOfDarknessBonus = 0; //placeholder
    const ahrimsDamnedBonus = 0; //placeholder
    const castleWarsBracletBonus = 0; //placeholder
    const charge = 0; //placeholder

    let weaponAttackType;
    let effectiveLevel, baseDamage, maxHit, prayerBonus;
    if (activeStyle?.attack_style === "magic") {
        weaponAttackType = "magic";
    } else {
        weaponAttackType = weaponType;
    }
    switch (weaponAttackType) {
        case "melee":
            prayerBonus = bonuses.strength || 1;
            effectiveLevel = Math.floor((Math.floor((strengthLevel + potionBonus) * prayerBonus) + meleeStyleBonus + 8) * voidBonus);
            baseDamage = Math.floor(0.5 + effectiveLevel * ((strengthBonus + 64) / 640));
            maxHit = Math.floor(baseDamage * specialBonus);
            break;
        case "ranged":
            prayerBonus = bonuses.ranged || 1;
            effectiveLevel = Math.floor((Math.floor((rangedLevel + potionBonus) * prayerBonus) + rangedStyleBonus + 8) * voidBonus);
            baseDamage = Math.floor(Math.floor(0.5 + (effectiveLevel * (rangedStrengthBonus + dartBonus + 64)) / 640) * gearBonus);
            maxHit = Math.floor(baseDamage * specialBonus);
            break;
        case "magic":
            if (selectedSpellName || activeStyle?.experience.includes("magic")) {
                prayerBonus = bonuses.magic || 0;
                const baseDamageModifier = Math.floor(Math.abs(baseMaxMagicDamage + chaosGauntletBoost + charge));
                const primaryMagicDamage = Math.floor(
                    Math.abs(
                        baseDamageModifier *
                            (1 +
                                Math.min(1, (visibleBonuses - voidMagicBonus) * shadowBonus) +
                                voidMagicBonus +
                                salveBonus +
                                avariceBonus +
                                smokeBattlestaffBonus +
                                virtusRobesAncientBonus +
                                prayerBonus)
                    )
                );
                const preHitRoll = Math.floor(
                    Math.abs(
                        Math.abs(
                            Math.abs(Math.abs(primaryMagicDamage * (1 + slayerBonus)) * (1 + sceptreWildernessBonus)) *
                                (1 + accursedScepterSpecialBonus)
                        ) *
                            (1 + tomesBonus)
                    )
                );
                {
                    /* Placeholder for onHitRoll */
                }
                const postHitRoll = Math.floor(
                    Math.abs(
                        Math.abs(Math.abs(preHitRoll * (1 + markOfDarknessBonus)) * (1 + ahrimsDamnedBonus)) * (1 + castleWarsBracletBonus)
                    )
                );
                {
                    /* Placeholder for postCalcModifiers */
                }
                maxHit = postHitRoll;
            } else {
                maxHit = "Please choose spell";
            }
    }

    return <div>Max Hit: {maxHit}</div>;
}

export default MaxHitCalculator;
