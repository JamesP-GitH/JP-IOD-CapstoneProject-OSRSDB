import dbConnect from "@/lib/dbConnect";
import { feetController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await feetController.getFeetById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching feet by ID:", error);
        return Response.json({ error: "Failed to fetch feet" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await feetController.updateFeet(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating feet:", error);
        return Response.json({ error: "Failed to update feet" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await feetController.deleteFeet(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting feet:", error);
        return Response.json({ error: "Failed to delete feet" }, { status: 500 });
    }
}
