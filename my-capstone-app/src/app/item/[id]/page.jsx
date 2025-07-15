import React from "react";
import { notFound } from "next/navigation";
import ItemDetails from "@/components/ItemDetails";
import { getItemById } from "@/controllers";

export default async function ItemPage({ params }) {
    const { id } = params;

    try {
        const item = await getItemById(id);
        if (!item) {
            notFound();
        }

        return (
            <div className="item-page px-4 py-3">
                <ItemDetails item={item} />
            </div>
        );
    } catch (error) {
        notFound();
    }
}
