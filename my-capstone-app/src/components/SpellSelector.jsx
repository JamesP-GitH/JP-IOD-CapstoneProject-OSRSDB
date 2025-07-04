import React from "react";
import { Form } from "react-bootstrap";
import { allSpells } from "@/utils/SpellbookUtils";

function SpellSelector({ selectedSpellName, onSpellSelect }) {
    const handleChange = (e) => {
        const spellName = e.target.value;
        onSpellSelect?.(spellName);
    };

    return (
        <Form.Group controlId="spellSelector" className="mt-0">
            <Form.Label style={{ fontSize: "1vw" }}>Select Spell</Form.Label>
            <Form.Select value={selectedSpellName || ""} onChange={handleChange} style={{ height: "28px", fontSize: "10px" }}>
                <option value="" disabled>
                    Select a spell...
                </option>
                {allSpells.map(({ name }) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}

export default SpellSelector;
