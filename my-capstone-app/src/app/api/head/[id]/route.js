import dbConnect from "@/lib/dbConnect";
import { headController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await headController.getHeadById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching head by ID:", error);
        return Response.json({ error: "Failed to fetch head" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await headController.updateHead(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating head:", error);
        return Response.json({ error: "Failed to update head" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await headController.deleteHead(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting head:", error);
        return Response.json({ error: "Failed to delete head" }, { status: 500 });
    }
}
