import dbConnect from "@/lib/dbConnect";
import { legController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await legController.getLegNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await legController.getLegByName(name), { status: 200 });
        }
        return Response.json(await legController.getAllLegs(), { status: 200 });
    } catch (error) {
        console.error("Error fetching leg items:", error);
        return Response.json({ error: "Failed to fetch leg items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await legController.createLeg(data);
    return Response.json(result, { status: 200 });
}
