import dbConnect from "@/lib/dbConnect";
import { weaponController } from "@/controllers";

export async function GET(_, { params }) {
    await dbConnect();
    const result = await weaponController.getWeaponById(params.id);
    return Response.json(result);
}

export async function PUT(req, { params }) {
    await dbConnect();
    const data = await req.json();
    const result = await weaponController.updateWeapon(params.id, data);
    return Response.json(result);
}

export async function DELETE(_, { params }) {
    await dbConnect();
    const result = await weaponController.deleteWeapon(params.id);
    return Response.json(result);
}
