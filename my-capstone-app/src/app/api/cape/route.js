import dbConnect from "@/lib/dbConnect";
import { capeController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await capeController.getCapeNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await capeController.getCapeByName(name), { status: 200 });
        }
        return Response.json(await capeController.getAllCapes(), { status: 200 });
    } catch (error) {
        console.error("Error fetching cape items:", error);
        return Response.json({ error: "Failed to fetch cape items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    try {
        const result = await capeController.createCape(data);
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error creating cape:", error);
        return Response.json({ error: "Failed to create cape" }, { status: 500 });
    }
}
