import dbConnect from "@/lib/dbConnect";
import { handController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await handController.getHandById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching hand by ID:", error);
        return Response.json({ error: "Failed to fetch hand" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await handController.updateHand(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating hand:", error);
        return Response.json({ error: "Failed to update hand" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await handController.deleteHand(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting hand:", error);
        return Response.json({ error: "Failed to delete hand" }, { status: 500 });
    }
}
