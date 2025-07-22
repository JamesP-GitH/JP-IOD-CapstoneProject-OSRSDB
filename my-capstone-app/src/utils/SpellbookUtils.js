// --- Standard Spellbook Spells ---
const standardSpellbook = [
    { name: "Wind Strike", damage: 8 },
    { name: "Water Strike", damage: 8 },
    { name: "Earth Strike", damage: 8 },
    { name: "Fire Strike", damage: 8 },
    { name: "Wind Bolt", damage: 12 },
    { name: "Water Bolt", damage: 12 },
    { name: "Earth Bolt", damage: 12 },
    { name: "Fire Bolt", damage: 12 },
    { name: "Crumble Undead", damage: 15 },
    { name: "Wind Blast", damage: 16 },
    { name: "Water Blast", damage: 16 },
    { name: "Iban Blast", damage: 25 },
    { name: "Earth Blast", damage: 16 },
    { name: "Fire Blast", damage: 16 },
    { name: "Saradomin Strike", damage: 20 },
    { name: "Claws of Guthix", damage: 20 },
    { name: "Flames of Zamorak", damage: 20 },
    { name: "Wind Wave", damage: 20 },
    { name: "Water Wave", damage: 20 },
    { name: "Earth Wave", damage: 20 },
    { name: "Fire Wave", damage: 20 },
    { name: "Wind Surge", damage: 24 },
    { name: "Water Surge", damage: 24 },
    { name: "Earth Surge", damage: 24 },
    { name: "Fire Surge", damage: 24 },
];

// --- Ancient Magicks ---
const ancientMagicks = [
    { name: "Smoke Rush", damage: 13 },
    { name: "Shadow Rush", damage: 14 },
    { name: "Blood Rush", damage: 15 },
    { name: "Ice Rush", damage: 16 },
    { name: "Smoke Burst", damage: 17 },
    { name: "Shadow Burst", damage: 18 },
    { name: "Blood Burst", damage: 21 },
    { name: "Ice Burst", damage: 22 },
    { name: "Smoke Blitz", damage: 23 },
    { name: "Shadow Blitz", damage: 24 },
    { name: "Blood Blitz", damage: 25 },
    { name: "Ice Blitz", damage: 26 },
    { name: "Smoke Barrage", damage: 27 },
    { name: "Shadow Barrage", damage: 28 },
    { name: "Blood Barrage", damage: 29 },
    { name: "Ice Barrage", damage: 30 },
];

// --- Arceuus Spellbook ---
const arceuusSpellbook = [
    { name: "Ghostly Grasp", damage: 12 },
    { name: "Skeletal Grasp", damage: 17 },
    { name: "Undead Grasp", damage: 24 },
    { name: "Inferior Demonbane", damage: 16 },
    { name: "Superior Demonbane", damage: 23 },
    { name: "Dark Demonbane", damage: 30 },
];

// Combine all spellbooks into a single list for easy access
export const allSpells = [...standardSpellbook, ...ancientMagicks, ...arceuusSpellbook];

// Returns the base max hit (damage) of a spell given its name.
export function getSpellDamage(spellName) {
    const match = allSpells.find((spell) => spell.name === spellName);
    return match ? match.damage : null;
}
