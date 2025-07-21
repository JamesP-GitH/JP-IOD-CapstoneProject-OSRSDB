import React from "react";
import { Form, Image } from "react-bootstrap";

// A reusable input field for individual stat values (e.g. Attack, Strength, etc.)
function StatInput({ statKey, value, onChange, baseMax = 99, boosts = 0 }) {
    // Derive the base stat name by removing "Level" from the key (e.g., "attackLevel" -> "attack")
    const baseKey = statKey.replace("Level", "");

    // Calculate the maximum possible value for the stat (base + optional boost)
    const max = baseMax + boosts;

    // Ensure value is treated as a number for comparisons
    const numericValue = Number(value);

    // Check if current input exceeds the allowed maximum
    const isOverMax = numericValue > max;

    return (
        <Form.Group controlId={statKey} className="d-flex align-items-center gap-2">
            {/* Stat icon (e.g., /icons/attack_icon.png) */}
            <Image src={`/icons/${baseKey}_icon.png`} alt={statKey} width={24} height={24} />
            {/* Display the max possible value as a reference (e.g. 105/) */}
            <span>{max}/</span>

            {/* Numeric input for entering the stat value */}
            <Form.Control
                type="number"
                className="no-spinner"
                min={1}
                max={max}
                value={value}
                onChange={(e) => onChange(statKey, e.target.value)}
                style={{
                    width: "60px",
                    // Highlight input field if value exceeds allowed max
                    backgroundColor: isOverMax ? "rgba(255, 0, 0, 0.3)" : undefined,
                    borderColor: isOverMax ? "red" : undefined,
                }}
            />
        </Form.Group>
    );
}

export default StatInput;
