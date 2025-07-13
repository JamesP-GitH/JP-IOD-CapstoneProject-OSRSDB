import { Neck } from "@/models";

export async function getAllNecks() {
    return await Neck.find({});
}

export async function getNeckById(id) {
    const neck = await Neck.findById(id);
    if (!neck) {
        throw new Error("Neck not found");
    }
    return neck;
}

export async function getNeckByName(name) {
    const necks = await Neck.find({ name: { $regex: name, $options: "i" } });
    if (necks.length === 0) {
        throw new Error("No neck items found matching that name");
    }
    return necks;
}

export async function getNeckNames() {
    const data = await Neck.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createNeck(neckData) {
    const newNeck = new Neck(neckData);
    return await newNeck.save();
}

export async function updateNeck(id, neckData) {
    const updatedNeck = await Neck.findByIdAndUpdate(id, neckData, { new: true });
    if (!updatedNeck) {
        throw new Error("Neck not found for update");
    }
    return updatedNeck;
}

export async function deleteNeck(id) {
    const deletedNeck = await Neck.findByIdAndDelete(id);
    if (!deletedNeck) {
        throw new Error("Neck not found for deletion");
    }
    return deletedNeck;
}
