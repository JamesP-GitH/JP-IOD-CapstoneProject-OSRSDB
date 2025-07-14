import dbConnect from "@/lib/dbConnect";
import { neckController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await neckController.getNeckNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await neckController.getNeckByName(name), { status: 200 });
        }
        return Response.json(await neckController.getAllNecks(), { status: 200 });
    } catch (error) {
        console.error("Error fetching neck items:", error);
        return Response.json({ error: "Failed to fetch neck items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await neckController.createNeck(data);
    return Response.json(result, { status: 200 });
}
