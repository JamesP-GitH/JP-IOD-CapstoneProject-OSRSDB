import dbConnect from "@/lib/dbConnect";
import { ringController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await ringController.getRingById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching ring by ID:", error);
        return Response.json({ error: "Failed to fetch ring" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await ringController.updateRing(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating ring:", error);
        return Response.json({ error: "Failed to update ring" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await ringController.deleteRing(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting ring:", error);
        return Response.json({ error: "Failed to delete ring" }, { status: 500 });
    }
}
