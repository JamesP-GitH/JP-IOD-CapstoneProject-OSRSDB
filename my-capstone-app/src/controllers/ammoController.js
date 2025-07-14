import { Ammo } from "@/models";

export async function getAllAmmos() {
    return await Ammo.find({});
}

export async function getAmmoById(id) {
    const ammo = await Ammo.findById(id);
    if (!ammo) {
        throw new Error("Ammo not found");
    }
    return ammo;
}

export async function getAmmoByName(name) {
    const ammos = await Ammo.find({ name: { $regex: name, $options: "i" } });
    if (ammos.length === 0) {
        throw new Error("No ammo items found matching that name");
    }
    return ammos;
}

export async function getAmmoNames() {
    const data = await Ammo.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createAmmo(ammoData) {
    const newAmmo = new Ammo(ammoData);
    return await newAmmo.save();
}

export async function updateAmmo(id, ammoData) {
    const updatedAmmo = await Ammo.findByIdAndUpdate(id, ammoData, { new: true });
    if (!updatedAmmo) {
        throw new Error("Ammo not found for update");
    }
    return updatedAmmo;
}

export async function deleteAmmo(id) {
    const deletedAmmo = await Ammo.findByIdAndDelete(id);
    if (!deletedAmmo) {
        throw new Error("Ammo not found for deletion");
    }
    return deletedAmmo;
}
