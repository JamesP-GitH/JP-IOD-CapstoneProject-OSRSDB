import React from "react";

function ItemDetails({ item }) {
    if (!item) return <div>Item not found</div>;

    return (
        <div className="item-details">
            <h2>{item.wiki_name}</h2>
            <img src={`data:image/png;base64,${item.icon}`} alt={item.name} width={64} height={64} />
            <p>
                <strong>ID:</strong> {item._id ?? "N/A"}
            </p>
            <p>
                <strong>Members:</strong> {item.members ? "Yes" : "No"}
            </p>
            <p>
                <strong>Description:</strong> {item.description || "No description available."}
            </p>
        </div>
    );
}

export default ItemDetails;
