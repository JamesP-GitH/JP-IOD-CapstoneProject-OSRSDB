import { Shield } from "@/models";

export async function getAllShields() {
    return await Shield.find({});
}

export async function getShieldById(id) {
    const shield = await Shield.findById(id);
    if (!shield) {
        throw new Error("Shield not found");
    }
    return shield;
}

export async function getShieldByName(name) {
    const shields = await Shield.find({ name: { $regex: name, $options: "i" } });
    if (shields.length === 0) {
        throw new Error("No shields found matching that name");
    }
    return shields;
}

export async function getShieldNames() {
    const data = await Shield.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createShield(shieldData) {
    const newShield = new Shield(shieldData);
    return await newShield.save();
}

export async function updateShield(id, shieldData) {
    const updatedShield = await Shield.findByIdAndUpdate(id, shieldData, { new: true });
    if (!updatedShield) {
        throw new Error("Shield not found for update");
    }
    return updatedShield;
}

export async function deleteShield(id) {
    const deletedShield = await Shield.findByIdAndDelete(id);
    if (!deletedShield) {
        throw new Error("Shield not found for deletion");
    }
    return deletedShield;
}
