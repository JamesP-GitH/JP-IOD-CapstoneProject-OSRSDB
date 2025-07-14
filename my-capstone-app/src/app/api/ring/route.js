import dbConnect from "@/lib/dbConnect";
import { ringController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await ringController.getRingNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await ringController.getRingByName(name), { status: 200 });
        }
        return Response.json(await ringController.getAllRings(), { status: 200 });
    } catch (error) {
        console.error("Error fetching ring items:", error);
        return Response.json({ error: "Failed to fetch ring items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await ringController.createRing(data);
    return Response.json(result, { status: 200 });
}
