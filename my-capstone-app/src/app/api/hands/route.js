import dbConnect from "@/lib/dbConnect";
import { handController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await handController.getHandNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await handController.getHandByName(name), { status: 200 });
        }
        return Response.json(await handController.getAllHands(), { status: 200 });
    } catch (error) {
        console.error("Error fetching hand items:", error);
        return Response.json({ error: "Failed to fetch hand items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await handController.createHand(data);
    return Response.json(result, { status: 200 });
}
