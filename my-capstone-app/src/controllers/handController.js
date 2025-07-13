import { Hand } from "@/models";

export async function getAllHands() {
    return await Hand.find({});
}

export async function getHandById(id) {
    const hand = await Hand.findById(id);
    if (!hand) {
        throw new Error("Hand not found");
    }
    return hand;
}

export async function getHandByName(name) {
    const hands = await Hand.find({ name: { $regex: name, $options: "i" } });
    if (hands.length === 0) {
        throw new Error("No hand items found matching that name");
    }
    return hands;
}

export async function getHandNames() {
    const data = await Hand.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createHand(handData) {
    const newHand = new Hand(handData);
    return await newHand.save();
}

export async function updateHand(id, handData) {
    const updatedHand = await Hand.findByIdAndUpdate(id, handData, { new: true });
    if (!updatedHand) {
        throw new Error("Hand not found for update");
    }
    return updatedHand;
}

export async function deleteHand(id) {
    const deletedHand = await Hand.findByIdAndDelete(id);
    if (!deletedHand) {
        throw new Error("Hand not found for deletion");
    }
    return deletedHand;
}
