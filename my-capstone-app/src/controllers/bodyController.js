import { Body } from "@/models";

export async function getAllBodies() {
    return await Body.find({});
}

export async function getBodyById(id) {
    const body = await Body.findById(id);
    if (!body) {
        throw new Error("Body not found");
    }
    return body;
}

export async function getBodyByName(name) {
    const bodies = await Body.find({ name: { $regex: name, $options: "i" } });
    if (bodies.length === 0) {
        throw new Error("No body items found matching that name");
    }
    return bodies;
}

export async function getBodyNames() {
    const data = await Body.find({}, { name: 1, _id: 0 });
    const names = data.map((item) => item.name);
    return names;
}

export async function createBody(bodyData) {
    const newBody = new Body(bodyData);
    return await newBody.save();
}

export async function updateBody(id, bodyData) {
    const updatedBody = await Body.findByIdAndUpdate(id, bodyData, { new: true });
    if (!updatedBody) {
        throw new Error("Body not found for update");
    }
    return updatedBody;
}

export async function deleteBody(id) {
    const deletedBody = await Body.findByIdAndDelete(id);
    if (!deletedBody) {
        throw new Error("Body not found for deletion");
    }
    return deletedBody;
}
