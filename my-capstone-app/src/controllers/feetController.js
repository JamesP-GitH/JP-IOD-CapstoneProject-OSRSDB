import { Feet } from "@/models";

export async function getAllFeets() {
    return await Feet.find({});
}

export async function getFeetById(id) {
    const feet = await Feet.findById(id);
    if (!feet) {
        throw new Error("Feet not found");
    }
    return feet;
}

export async function getFeetByName(name) {
    const feets = await Feet.find({ name: { $regex: name, $options: "i" } });
    if (feets.length === 0) {
        throw new Error("No feet items found matching that name");
    }
    return feets;
}

export async function getFeetNames() {
    const data = await Feet.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createFeet(feetData) {
    const newFeet = new Feet(feetData);
    return await newFeet.save();
}

export async function updateFeet(id, feetData) {
    const updatedFeet = await Feet.findByIdAndUpdate(id, feetData, { new: true });
    if (!updatedFeet) {
        throw new Error("Feet not found for update");
    }
    return updatedFeet;
}

export async function deleteFeet(id) {
    const deletedFeet = await Feet.findByIdAndDelete(id);
    if (!deletedFeet) {
        throw new Error("Feet not found for deletion");
    }
    return deletedFeet;
}
