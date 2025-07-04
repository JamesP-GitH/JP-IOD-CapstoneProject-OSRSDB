import { Weapon } from "@/models";

export async function getAllWeapons() {
    return await Weapon.find({});
}

export async function getWeaponById(id) {
    const weapon = await Weapon.findById(id);
    if (!weapon) {
        throw new Error("Weapon not found");
    }
    return weapon;
}

export async function getWeaponByName(name) {
    const weapon = await Weapon.find({ name: { $regex: name, $options: "i" } });
    if (weapon.length === 0) {
        throw new Error("No weapons found matching that name");
    }
    return weapon;
}

export async function getWeaponByType(type) {
    const weapons = await Weapon.find({ "weapon.weapon_type": type });
    if (weapons.length === 0) {
        throw new Error("No weapons found matching that type");
    }
    return weapons;
}

export async function getAllWeaponTypes() {
    const types = await Weapon.distinct("weapon.weapon_type");
    if (!types || types.length === 0) {
        throw new Error("No weapon types found");
    }
    return types;
}
export async function getWeaponNames() {
    const data = await Weapon.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createWeapon(weaponData) {
    const newWeapon = new Weapon(weaponData);
    return await newWeapon.save();
}

export async function updateWeapon(id, weaponData) {
    const updatedWeapon = await Weapon.findByIdAndUpdate(id, weaponData, { new: true });
    if (!updatedWeapon) {
        throw new Error("Weapon not found for update");
    }
    return updatedWeapon;
}

export async function deleteWeapon(id) {
    const deletedWeapon = await Weapon.findByIdAndDelete(id);
    if (!deletedWeapon) {
        throw new Error("Weapon not found for deletion");
    }
    return deletedWeapon;
}
