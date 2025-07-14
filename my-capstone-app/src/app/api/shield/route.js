import dbConnect from "@/lib/dbConnect";
import { shieldController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await shieldController.getShieldNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await shieldController.getShieldByName(name), { status: 200 });
        }
        return Response.json(await shieldController.getAllShields(), { status: 200 });
    } catch (error) {
        console.error("Error fetching shields:", error);
        return Response.json({ error: "Failed to fetch shields" }, { status: 500 });
    }
}
export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await shieldController.createShield(data);
    return Response.json(result, { status: 200 });
}
