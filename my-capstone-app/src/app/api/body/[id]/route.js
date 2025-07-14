import dbConnect from "@/lib/dbConnect";
import { bodyController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await bodyController.getBodyById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching body by ID:", error);
        return Response.json({ error: "Failed to fetch body" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await bodyController.updateBody(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating body:", error);
        return Response.json({ error: "Failed to update body" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await bodyController.deleteBody(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting body:", error);
        return Response.json({ error: "Failed to delete body" }, { status: 500 });
    }
}
