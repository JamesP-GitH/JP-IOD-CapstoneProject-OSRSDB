import dbConnect from "@/lib/dbConnect";
import { feetController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await feetController.getFeetNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await feetController.getFeetByName(name), { status: 200 });
        }
        return Response.json(await feetController.getAllFeet(), { status: 200 });
    } catch (error) {
        console.error("Error fetching feet items:", error);
        return Response.json({ error: "Failed to fetch feet items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await feetController.createFeet(data);
    return Response.json(result, { status: 200 });
}
