import dbConnect from "@/lib/dbConnect";
import { weaponController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const type = searchParams.get("type");
    const name = searchParams.get("name");

    try {
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
        return Response.json(await weaponController.getAllWeapons(), { status: 200 });
    } catch (error) {
        console.error("Error fetching weapons:", error);
        return Response.json({ error: "Failed to fetch weapons" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await dbConnect();

        const data = await req.json();
        const result = await weaponController.createWeapon(data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error creating weapon:", error);
        return Response.json({ error: "Failed to create weapon" }, { status: 500 });
    }
}
