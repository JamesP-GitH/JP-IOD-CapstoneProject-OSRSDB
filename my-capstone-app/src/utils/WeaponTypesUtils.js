// Determines the combat style of a weapon based on its specific type.
function WeaponTypes(specificType) {
    // Types that fall under melee combat
    const meleeTypes = [
        "2h_sword",
        "axe",
        "banner",
        "blunt",
        "bludgeon",
        "bulwark",
        "claw",
        "partisan",
        "pickaxe",
        "polearm",
        "polestaff",
        "scythe",
        "slash_sword",
        "spear",
        "spiked",
        "stab_sword",
        "unarmed",
        "whip",
    ];

    // Types that fall under ranged combat
    const rangedTypes = ["blaster", "bow", "chinchompa", "crossbow", "gun", "thrown"];

    // Types that fall under magic combat
    const magicTypes = ["bladed_staff", "powered_staff", "powered_wand", "staff"];

    // Check and return the matching combat style
    if (meleeTypes.includes(specificType)) return "melee";
    if (rangedTypes.includes(specificType)) return "ranged";
    if (magicTypes.includes(specificType)) return "magic";

    // Default to melee if the type is unknown
    return "melee";
}

export default WeaponTypes;
