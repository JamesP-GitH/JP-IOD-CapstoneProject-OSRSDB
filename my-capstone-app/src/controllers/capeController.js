import { Cape } from "@/models";

export async function getAllCapes() {
    return await Cape.find({});
}

export async function getCapeById(id) {
    const cape = await Cape.findById(id);
    if (!cape) {
        throw new Error("Cape not found");
    }
    return cape;
}

export async function getCapeByName(name) {
    const capes = await Cape.find({ name: { $regex: name, $options: "i" } });
    if (capes.length === 0) {
        throw new Error("No cape items found matching that name");
    }
    return capes;
}

export async function getCapeNames() {
    const data = await Cape.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createCape(capeData) {
    const newCape = new Cape(capeData);
    return await newCape.save();
}

export async function updateCape(id, capeData) {
    const updatedCape = await Cape.findByIdAndUpdate(id, capeData, { new: true });
    if (!updatedCape) {
        throw new Error("Cape not found for update");
    }
    return updatedCape;
}

export async function deleteCape(id) {
    const deletedCape = await Cape.findByIdAndDelete(id);
    if (!deletedCape) {
        throw new Error("Cape not found for deletion");
    }
    return deletedCape;
}
