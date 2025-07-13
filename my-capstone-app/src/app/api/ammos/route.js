import dbConnect from "@/lib/dbConnect";
import { ammoController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await ammoController.getAmmoNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await ammoController.getAmmoByName(name), { status: 200 });
        }
        return Response.json(await ammoController.getAllAmmos(), { status: 200 });
    } catch (error) {
        console.error("Error fetching ammo items:", error);
        return Response.json({ error: "Failed to fetch ammo items" }, { status: 500 });
    }
}
export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await ammoController.createAmmo(data);
    return Response.json(result, { status: 200 });
}
