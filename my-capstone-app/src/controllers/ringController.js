import { Ring } from "@/models";

export async function getAllRings() {
    return await Ring.find({});
}

export async function getRingById(id) {
    const ring = await Ring.findById(id);
    if (!ring) {
        throw new Error("Ring not found");
    }
    return ring;
}

export async function getRingByName(name) {
    const rings = await Ring.find({ name: { $regex: name, $options: "i" } });
    if (rings.length === 0) {
        throw new Error("No ring items found matching that name");
    }
    return rings;
}

export async function getRingNames() {
    const data = await Ring.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createRing(ringData) {
    const newRing = new Ring(ringData);
    return await newRing.save();
}

export async function updateRing(id, ringData) {
    const updatedRing = await Ring.findByIdAndUpdate(id, ringData, { new: true });
    if (!updatedRing) {
        throw new Error("Ring not found for update");
    }
    return updatedRing;
}

export async function deleteRing(id) {
    const deletedRing = await Ring.findByIdAndDelete(id);
    if (!deletedRing) {
        throw new Error("Ring not found for deletion");
    }
    return deletedRing;
}
