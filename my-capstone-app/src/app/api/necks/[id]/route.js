import dbConnect from "@/lib/dbConnect";
import { neckController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await neckController.getNeckById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching neck by ID:", error);
        return Response.json({ error: "Failed to fetch neck" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await neckController.updateNeck(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating neck:", error);
        return Response.json({ error: "Failed to update neck" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await neckController.deleteNeck(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting neck:", error);
        return Response.json({ error: "Failed to delete neck" }, { status: 500 });
    }
}
