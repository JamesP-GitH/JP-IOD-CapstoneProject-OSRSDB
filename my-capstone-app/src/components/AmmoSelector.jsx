import React from "react";
import { Form } from "react-bootstrap";
import { dartOptions } from "@/utils/DartUtils";

function AmmoSelector({ selectedAmmoName, onAmmoSelect }) {
    const handleSelect = (e) => {
        const dart = e.target.value;
        onAmmoSelect(dart);
    };

    return (
        <Form.Group controlId="ammoSelector" className="mt-0">
            <Form.Label style={{ fontSize: "1vw" }}>Select Ammo</Form.Label>
            <Form.Select value={selectedAmmoName || ""} onChange={handleSelect} style={{ height: "28px", fontSize: "10px" }}>
                <option value="" disabled>
                    Select ammo...
                </option>
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
