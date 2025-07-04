import dbConnect from "@/lib/dbConnect";
import { weaponController } from "@/controllers";  

await async function GET(_, { params }) {
    await dbConnect();
    const result = await weaponController.getWeaponById(params.id);
    return Response.json(result)
}