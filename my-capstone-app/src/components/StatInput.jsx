import React from "react";
import { Form, Image } from "react-bootstrap";

function StatInput({ statKey, value, onChange, baseMax = 99, boosts = 0 }) {
    const baseKey = statKey.replace("Level", ""); // removes 'Level' if present
    const max = baseMax + boosts;
    const numericValue = Number(value);
    const isOverMax = numericValue > max;

    return (
        <Form.Group controlId={statKey} className="d-flex align-items-center gap-2">
            <Image src={`/icons/${baseKey}_icon.png`} alt={statKey} width={24} height={24} />
            <span>{max}/</span>
            <Form.Control
                type="number"
                className="no-spinner"
                min={1}
                max={max}
                value={value}
                onChange={(e) => onChange(statKey, e.target.value)}
                style={{
                    width: "60px",
                    backgroundColor: isOverMax ? "rgba(255, 0, 0, 0.3)" : undefined,
                    borderColor: isOverMax ? "red" : undefined,
                }}
            />
        </Form.Group>
    );
}

export default StatInput;
