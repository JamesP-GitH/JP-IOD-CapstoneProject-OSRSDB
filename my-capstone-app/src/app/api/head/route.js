import dbConnect from "@/lib/dbConnect";
import { headController } from "@/controllers";

export async function GET(req) {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const name = searchParams.get("name");

    try {
        if (query === "names") {
            return Response.json(await headController.getHeadNames(), { status: 200 });
        }
        if (name) {
            return Response.json(await headController.getHeadByName(name), { status: 200 });
        }
        return Response.json(await headController.getAllHeads(), { status: 200 });
    } catch (error) {
        console.error("Error fetching head items:", error);
        return Response.json({ error: "Failed to fetch head items" }, { status: 500 });
    }
}

export async function POST(req) {
    await dbConnect();

    const data = await req.json();
    const result = await headController.createHead(data);
    return Response.json(result, { status: 200 });
}
