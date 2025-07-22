// List of available darts with their corresponding ranged strength values
export const dartOptions = [
    { name: "Mithril dart", rangedStrength: 9 },
    { name: "Adamant dart", rangedStrength: 17 },
    { name: "Rune dart", rangedStrength: 26 },
    { name: "Amethyst dart", rangedStrength: 28 },
    { name: "Dragon dart", rangedStrength: 35 },
];

// Returns the ranged strength of a dart given its name.
export function getDartDamage(dartName) {
    const match = dartOptions.find((dart) => dart.name === dartName);
    return match ? match.rangedStrength : null; // If the dart name doesn't match any known dart, returns null.
}
