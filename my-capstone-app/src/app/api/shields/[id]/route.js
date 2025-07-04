import dbConnect from "@/lib/dbConnect";
import { shieldController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await shieldController.getShieldById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching shield by ID:", error);
        return Response.json({ error: "Failed to fetch shield" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await shieldController.updateShield(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating shield:", error);
        return Response.json({ error: "Failed to update shield" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await shieldController.deleteShield(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting shield:", error);
        return Response.json({ error: "Failed to delete shield" }, { status: 500 });
    }
}
