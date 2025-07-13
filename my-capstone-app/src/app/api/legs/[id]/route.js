import dbConnect from "@/lib/dbConnect";
import { legController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await legController.getLegById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching leg by ID:", error);
        return Response.json({ error: "Failed to fetch leg" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await legController.updateLeg(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating leg:", error);
        return Response.json({ error: "Failed to update leg" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await legController.deleteLeg(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting leg:", error);
        return Response.json({ error: "Failed to delete leg" }, { status: 500 });
    }
}
