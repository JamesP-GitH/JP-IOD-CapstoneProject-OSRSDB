import React, { useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import ItemCard from "./ItemCard";

// Component displays a list of gear items filtered by the selected slot.
function ItemList({ items, slot, loading, error, onItemClick }) {
    // State to track current sorting option (default: sort by ID ascending)
    const [sortOption, setSortOption] = useState("id-asc");
    // State to track current search query
    const [searchQuery, setSearchQuery] = useState("");

    // Show message if no gear slot is selected
    if (!slot) {
        return <h6 className="text-center">Select a gear slot to see items.</h6>;
    }
    // Show loading message while items are loading
    if (loading) {
        return <h6 className="text-center">Loading items...</h6>;
    }
    // Show error message if there's an error loading items
    if (error) {
        return <h6 className="text-center">Error: {error}</h6>;
    }
    // Show message if no items are found for the selected slot
    if (items.length === 0) {
        return <h6 className="text-center">No items found for this slot.</h6>;
    }

    // Function to sort items array based on the selected sort option
    function sortItems(items, sortOption) {
        // Create a shallow copy to avoid mutating original array
        const sorted = [...items];

        switch (sortOption) {
            case "name-asc":
                // Sort items alphabetically by name (A to Z)
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc":
                // Sort items alphabetically by name (Z to A)
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case "cost-high":
                // Sort items by cost descending (highest to lowest)
                return sorted.sort((a, b) => b.cost - a.cost);
            case "cost-low":
                // Sort items by cost ascending (lowest to highest)
                return sorted.sort((a, b) => a.cost - b.cost);
            case "id-asc":
                // Sort items by their ID ascending (lowest to highest)
                return sorted.sort((a, b) => a._id - b._id);
            case "id-desc":
                // Sort items by their ID descending (highest to lowest)
                return sorted.sort((a, b) => b._id - a._id);
            default:
                // Default: return unsorted
                return sorted;
        }
    }

    // Filter items to exclude placeholders and duplicates, and filter by search query
    const filteredItems = items
        .filter((item) => !item.placeholder && !item.duplicate) // Remove placeholder and duplicate items
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())); // Search by item name (case-insensitive)

    // Sort the filtered items based on current sort option
    const sortedItems = sortItems(filteredItems, sortOption);

    return (
        <>
            {/* Display the selected slot name with first letter capitalized */}
            <h6 className="text-center">{slot.charAt(0).toUpperCase() + slot.slice(1)} items</h6>
            {/* Sorting and searching controls */}
            <div className="d-flex justify-content-around">
                {/* Sorting dropdown */}
                <Form.Group controlId="sortSelect" className="mb-2 text-center">
                    <Form.Select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        style={{ maxWidth: "140px", height: "34px", paddingY: "0px", margin: "0 auto", fontSize: "12px" }}
                    >
                        {/* Sort options */}
                        <option value="name-asc">Name (A → Z)</option>
                        <option value="name-desc">Name (Z → A)</option>
                        <option value="id-asc">ID (Low → High)</option>
                        <option value="id-desc">ID (High → Low)</option>
                        <option value="cost-high">Cost (High → Low)</option>
                        <option value="cost-low">Cost (Low → High)</option>
                    </Form.Select>
                </Form.Group>

                {/* Search input */}
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

            {/* Container for the list of items */}
            <Container
                className="justify-content-center item-list-wrapper"
                style={{ overflowY: "auto", height: "256px" }} // Enable vertical scrolling with fixed height
            >
                {/* List group to display sorted and filtered items */}
                <ListGroup>
                    {sortedItems.map((item) => (
                        // Render an ItemCard for each item, with onClick handler to select item
                        <ItemCard key={item._id} item={item} onClick={() => onItemClick(item)} />
                    ))}
                </ListGroup>
            </Container>
        </>
    );
}

export default ItemList;
