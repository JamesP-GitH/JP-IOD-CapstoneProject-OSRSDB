import dbConnect from "@/lib/dbConnect";
import { weaponController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const type = searchParams.get("type");
    const name = searchParams.get("name");
    const id = searchParams.get("id");
    if (query === "names") {
        return Response.json(await weaponController.getWeaponNames(), { status: 200 });
    }
    if (query === "types") {
        return Response.json(await weaponController.getAllWeaponTypes(), { status: 200 });
    }
    if (type) {
        return Response.json(await weaponController.getWeaponByType(type), { status: 200 });
    }
    if (name) {
        return Response.json(await weaponController.getWeaponByName(name), { status: 200 });
    }
    if (id) {
        return Response.json(await weaponController.getWeaponById(id), { status: 200 });
    }
    return Response.json(await weaponController.getAllWeapons(), { status: 200 });
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await weaponController.createWeapon(data);
    return Response.json(result, { status: 200 });
}
