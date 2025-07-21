import React from "react";

// Object mapping prayer names to their respective stat bonuses.
// Each bonus is a multiplier applied to the corresponding stat.
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
    Deadeye: { ranged: 1.18 },
    Rigour: { ranged: 1.23, defence: 1.25 },

    Mystic_Will: { magic: 0 },
    Mystic_Lore: { magic: 0.01 },
    Mystic_Might: { magic: 0.02 },
    Mystic_Vigour: { magic: 0.03 },
    Augury: { magic: 0.04, defence: 1.25 },
};

// Function that takes an array of active prayer names and calculates
// the highest bonus values per stat across all active prayers.
function PrayerBonuses(activePrayers) {
    // Initialize result with zero bonuses for all stats
    const result = {
        attack: 0,
        strength: 0,
        defence: 0,
        ranged: 0,
        magic: 0,
    };

    // Iterate over each active prayer
    activePrayers.forEach((prayer) => {
        // Look up the bonus values for this prayer
        const bonus = prayerBonuses[prayer];
        // If prayer is not found in the prayerBonuses object, skip it
        if (!bonus) return;

        // For each stat affected by this prayer, update result if this prayer's
        // bonus is greater than the current recorded bonus for that stat
        for (const stat in bonus) {
            if (bonus[stat] > result[stat]) {
                result[stat] = bonus[stat];
            }
        }
    });

    // Return the final combined bonuses representing the highest multipliers
    return result;
}

export default PrayerBonuses;
