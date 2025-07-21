import React from "react";
import { Form } from "react-bootstrap";
import { dartOptions } from "@/utils/DartUtils"; // List of available dart/ammo options

// Functional component that renders an ammo (dart) selector dropdown
function AmmoSelector({ selectedAmmoName, onAmmoSelect }) {
    // Event handler for when a new ammo is selected
    const handleSelect = (e) => {
        const dart = e.target.value;
        onAmmoSelect(dart);
    };

    return (
        // Bootstrap form group for styling and structure
        <Form.Group controlId="ammoSelector" className="mt-0">
            <Form.Label style={{ fontSize: "1vw" }}>Select Ammo</Form.Label>
            <Form.Select value={selectedAmmoName || ""} onChange={handleSelect} style={{ height: "28px", fontSize: "10px" }}>
                {/* Placeholder option prompting user to select ammo */}
                <option value="" disabled>
                    Select ammo...
                </option>

                {/* Dynamically render options from the dartOptions array */}
                {dartOptions.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default AmmoSelector;
