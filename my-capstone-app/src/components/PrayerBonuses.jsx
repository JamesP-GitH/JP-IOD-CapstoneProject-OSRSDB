import React from "react";

const prayerBonuses = {
    Burst_of_Strength: { strength: 1.05 },
    Superhuman_Strength: { strength: 1.1 },
    Ultimate_Strength: { strength: 1.15 },

    Clarity_of_Thought: { attack: 1.05 },
    Improved_Reflexes: { attack: 1.1 },
    Incredible_Reflexes: { attack: 1.15 },

    Thick_Skin: { defence: 1.05 },
    Rock_Skin: { defence: 1.1 },
    Steel_Skin: { defence: 1.15 },

    Chivalry: { attack: 1.15, strength: 1.18, defence: 1.2 },
    Piety: { attack: 1.2, strength: 1.23, defence: 1.25 },

    Sharp_Eye: { ranged: 1.05 },
    Hawk_Eye: { ranged: 1.1 },
    Eagle_Eye: { ranged: 1.15 },
    Deadeye: { ranged: 1.2 },
    Rigour: { ranged: 1.23, defence: 1.25 },

    Mystic_Will: { magic: 1.05 },
    Mystic_Lore: { magic: 1.1 },
    Mystic_Might: { magic: 1.15 },
    Mystic_Vigour: { magic: 1.2 },
    Augury: { magic: 1.0, defence: 1.25 }, // Magic accuracy only
};

function PrayerBonuses(activePrayers) {
    const result = {
        attack: 0,
        strength: 0,
        defence: 0,
        ranged: 1,
        magic: 0,
    };

    activePrayers.forEach((prayer) => {
        const bonus = prayerBonuses[prayer];
        if (!bonus) return;

        for (const stat in bonus) {
            if (bonus[stat] > result[stat]) {
                result[stat] = bonus[stat];
            }
        }
    });

    return result;
}

export default PrayerBonuses;
