import dbConnect from "@/lib/dbConnect";
import { ammoController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await ammoController.getAmmoById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching ammo by ID:", error);
        return Response.json({ error: "Failed to fetch ammo" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await ammoController.updateAmmo(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating ammo:", error);
        return Response.json({ error: "Failed to update ammo" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await ammoController.deleteAmmo(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting ammo:", error);
        return Response.json({ error: "Failed to delete ammo" }, { status: 500 });
    }
}
