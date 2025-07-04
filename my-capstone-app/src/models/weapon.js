const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Weapon stance  schema
const weaponStanceSchema = new Schema(
    {
        combat_style: String,
        attack_type: String,
        attack_style: String,
        experience: String,
    },
    { _id: false }
);

// Weapon-specific schema (nested in itemSchema)
const weaponSchema = new Schema(
    {
        attack_speed: Number,
        weapon_type: String,
        stances: [weaponStanceSchema],
    },
    { _id: false }
);

// Equipment stats schema (nested in itemSchema)
const equipmentSchema = new Schema(
    {
        attack_stab: Number,
        attack_slash: Number,
        attack_crush: Number,
        attack_magic: Number,
        attack_ranged: Number,
        defence_stab: Number,
        defence_slash: Number,
        defence_crush: Number,
        defence_magic: Number,
        defence_ranged: Number,
        melee_strength: Number,
        ranged_strength: Number,
        magic_damage: Number,
        prayer: Number,
        slot: String,
        requirements: mongoose.Schema.Types.Mixed,
    },
    { _id: false }
);

// Main item schema for weapons
const itemSchema = new Schema(
    {
        _id: Number,
        name: String,
        quest_item: Boolean,
        equipment: equipmentSchema,
        weapon: weaponSchema,
        extra: mongoose.Schema.Types.Mixed,
    },
    { strict: false }
);

module.exports = mongoose.model("weapon", itemSchema);
