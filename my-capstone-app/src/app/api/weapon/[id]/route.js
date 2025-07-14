import dbConnect from "@/lib/dbConnect";
import { weaponController } from "@/controllers";

export async function GET(_, { params }) {
    try {
        await dbConnect();
        const result = await weaponController.getWeaponById(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching weapon by ID:", error);
        return Response.json({ error: "Failed to fetch weapon" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        await dbConnect();
        const data = await req.json();
        const result = await weaponController.updateWeapon(params.id, data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error updating weapon:", error);
        return Response.json({ error: "Failed to update weapon" }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    try {
        await dbConnect();
        const result = await weaponController.deleteWeapon(params.id);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error deleting weapon:", error);
        return Response.json({ error: "Failed to delete weapon" }, { status: 500 });
    }
}
