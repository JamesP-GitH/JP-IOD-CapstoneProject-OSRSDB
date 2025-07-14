import React from "react";
import { notFound } from "next/navigation";
import ItemDetails from "@/components/ItemDetails";
import { getWeaponById } from "@/controllers/weaponController";

export default async function ItemPage({ params }) {
    const { id } = params;

    try {
        const item = await getWeaponById(id);
        if (!item) {
            notFound();
        }

        return (
            <div className="item-page">
                <h1>{item.wiki_name}</h1>
                <ItemDetails item={item} />
            </div>
        );
    } catch (error) {
        notFound();
    }
}
