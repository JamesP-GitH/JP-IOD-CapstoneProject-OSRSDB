import { Leg } from "@/models";

export async function getAllLegs() {
    return await Leg.find({});
}

export async function getLegById(id) {
    const leg = await Leg.findById(id);
    if (!leg) {
        throw new Error("Leg not found");
    }
    return leg;
}

export async function getLegByName(name) {
    const legs = await Leg.find({ name: { $regex: name, $options: "i" } });
    if (legs.length === 0) {
        throw new Error("No leg items found matching that name");
    }
    return legs;
}

export async function getLegNames() {
    const data = await Leg.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createLeg(legData) {
    const newLeg = new Leg(legData);
    return await newLeg.save();
}

export async function updateLeg(id, legData) {
    const updatedLeg = await Leg.findByIdAndUpdate(id, legData, { new: true });
    if (!updatedLeg) {
        throw new Error("Leg not found for update");
    }
    return updatedLeg;
}

export async function deleteLeg(id) {
    const deletedLeg = await Leg.findByIdAndDelete(id);
    if (!deletedLeg) {
        throw new Error("Leg not found for deletion");
    }
    return deletedLeg;
}
