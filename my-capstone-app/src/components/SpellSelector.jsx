import React from "react";
import { Form } from "react-bootstrap";
import { allSpells } from "@/utils/SpellbookUtils";

// Component to select a spell from a dropdown
function SpellSelector({ selectedSpellName, onSpellSelect }) {
    // Event handler for when a spell is selected
    const handleChange = (e) => {
        const spellName = e.target.value;
        onSpellSelect?.(spellName);
    };

    return (
        // Bootstrap Form Group wrapper
        <Form.Group controlId="spellSelector" className="mt-0">
            {/* Small label for the dropdown */}
            <Form.Label style={{ fontSize: "1vw" }}>Select Spell</Form.Label>

            {/* Dropdown with all spells */}
            <Form.Select value={selectedSpellName || ""} onChange={handleChange} style={{ height: "28px", fontSize: "10px" }}>
                {/* Default disabled option */}
                <option value="" disabled>
                    Select a spell...
                </option>

                {/* Map allSpells to options */}
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
