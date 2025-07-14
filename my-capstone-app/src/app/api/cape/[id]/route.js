import dbConnect from "@/lib/dbConnect";
import { capeController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await capeController.getCapeById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching cape by ID:", error);
        return Response.json({ error: "Failed to fetch cape" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await capeController.updateCape(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating cape:", error);
        return Response.json({ error: "Failed to update cape" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await capeController.deleteCape(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting cape:", error);
        return Response.json({ error: "Failed to delete cape" }, { status: 500 });
    }
}
