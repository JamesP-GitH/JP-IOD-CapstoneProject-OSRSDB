import React, { useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import ItemCard from "./ItemCard";

function ItemList({ items, slot, loading, error, onItemClick }) {
    const [sortOption, setSortOption] = useState("id-asc");
    const [searchQuery, setSearchQuery] = useState("");

    if (!slot) {
        return <h6 className="text-center">Select a gear slot to see items.</h6>;
    }
    if (loading) {
        return <h6 className="text-center">Loading items...</h6>;
    }
    if (error) {
        return <h6 className="text-center">Error: {error}</h6>;
    }
    if (items.length === 0) {
        return <h6 className="text-center">No items found for this slot.</h6>;
    }

    function sortItems(items, sortOption) {
        const sorted = [...items];

        switch (sortOption) {
            case "name-asc":
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc":
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case "cost-high":
                return sorted.sort((a, b) => b.cost - a.cost);
            case "cost-low":
                return sorted.sort((a, b) => a.cost - b.cost);
            case "id-asc":
                return sorted.sort((a, b) => a._id - b._id);
            case "id-desc":
                return sorted.sort((a, b) => b._id - a._id);
            default:
                return sorted;
        }
    }
    const filteredItems = items
        .filter((item) => !item.placeholder && !item.duplicate)
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const sortedItems = sortItems(filteredItems, sortOption);

    return (
        <>
            <h6 className="text-center">{slot.charAt(0).toUpperCase() + slot.slice(1)} items</h6>{" "}
            <div className="d-flex justify-content-around">
                <Form.Group controlId="sortSelect" className="mb-2 text-center">
                    <Form.Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ maxWidth: "140px", height: "34px", paddingY: "0px", margin: "0 auto", fontSize: "12px" }}
                    >
                        <option value="name-asc">Name (A → Z)</option>
                        <option value="name-desc">Name (Z → A)</option>
                        <option value="id-asc">ID (Low → High)</option>
                        <option value="id-desc">ID (High → Low)</option>
                        <option value="cost-high">Cost (High → Low)</option>
                        <option value="cost-low">Cost (Low → High)</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="searchItems" className="mb-2 text-center">
                    <Form.Control
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ maxWidth: "140px", height: "34px", paddingY: "0px", margin: "0 auto", fontSize: "12px" }}
                    />
                </Form.Group>
            </div>
            <Container className="justify-content-center item-list-wrapper" style={{ overflowY: "auto", height: "256px" }}>
                <ListGroup>
                    {sortedItems.map((item) => (
                        <ItemCard key={item._id} item={item} onClick={() => onItemClick(item)} />
                    ))}
                </ListGroup>
            </Container>
        </>
    );
}

export default ItemList;
