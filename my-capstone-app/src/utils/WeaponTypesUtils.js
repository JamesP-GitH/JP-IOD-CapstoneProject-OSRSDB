function WeaponTypes(specificType) {
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

    const rangedTypes = ["blaster", "bow", "chinchompa", "crossbow", "gun", "thrown"];

    const magicTypes = ["bladed_staff", "powered_staff", "powered_wand", "staff"];
    if (meleeTypes.includes(specificType)) return "melee";
    if (rangedTypes.includes(specificType)) return "ranged";
    if (magicTypes.includes(specificType)) return "magic";

    return "melee";
}

export default WeaponTypes;
