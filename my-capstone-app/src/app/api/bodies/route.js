import dbConnect from "@/lib/dbConnect";
import { bodyController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await bodyController.getBodyNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await bodyController.getBodyByName(name), { status: 200 });
        }
        return Response.json(await bodyController.getAllBodies(), { status: 200 });
    } catch (error) {
        console.error("Error fetching body items:", error);
        return Response.json({ error: "Failed to fetch body items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await bodyController.createBody(data);
    return Response.json(result, { status: 200 });
}
