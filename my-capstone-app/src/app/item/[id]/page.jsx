import React from "react";
import { notFound } from "next/navigation";
import ItemDetails from "@/components/ItemDetails";
import { getItemById } from "@/controllers";

// Component for rendering the item page based on URL id params
export default async function ItemPage({ params }) {
    // Extract item ID from route parameters
    const { id } = params;

    try {
        // Attempt to fetch the item by ID
        const item = await getItemById(id);

        // If item is not found, render 404 page
        if (!item) {
            notFound();
        }

        // If item exists, render the page with item details
        return (
            <div className="item-page px-4 py-3">
                <ItemDetails item={item} />
            </div>
        );
    } catch (error) {
        // In case of error render 404 page
        notFound();
    }
}
