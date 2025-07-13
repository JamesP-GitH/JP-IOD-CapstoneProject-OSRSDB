import mongoose from "mongoose";
const { Schema } = mongoose;

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
        requirements: Schema.Types.Mixed,
    },
    { _id: false }
);

const legSchema = new Schema(
    {
        _id: Number,
        name: String,
        quest_item: Boolean,
        equipment: equipmentSchema,
        weapon: Schema.Types.Mixed,
        extra: Schema.Types.Mixed,
    },
    { strict: false }
);

const Leg = mongoose.models.Leg || mongoose.model("leg", legSchema);
export default Leg;
