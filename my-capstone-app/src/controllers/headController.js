import { Head } from "@/models";

export async function getAllHeads() {
    return await Head.find({});
}

export async function getHeadById(id) {
    const head = await Head.findById(id);
    if (!head) {
        throw new Error("Head not found");
    }
    return head;
}

export async function getHeadByName(name) {
    const heads = await Head.find({ name: { $regex: name, $options: "i" } });
    if (heads.length === 0) {
        throw new Error("No head items found matching that name");
    }
    return heads;
}

export async function getHeadNames() {
    const data = await Head.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createHead(headData) {
    const newHead = new Head(headData);
    return await newHead.save();
}

export async function updateHead(id, headData) {
    const updatedHead = await Head.findByIdAndUpdate(id, headData, { new: true });
    if (!updatedHead) {
        throw new Error("Head not found for update");
    }
    return updatedHead;
}

export async function deleteHead(id) {
    const deletedHead = await Head.findByIdAndDelete(id);
    if (!deletedHead) {
        throw new Error("Head not found for deletion");
    }
    return deletedHead;
}
