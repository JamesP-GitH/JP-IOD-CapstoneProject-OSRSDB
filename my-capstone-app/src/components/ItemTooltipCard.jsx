import React from "react";
import { Tooltip } from "react-bootstrap";

// Functional component that renders a tooltip showing item stats and weapon info
function ItemTooltipCard(item) {
    // Destructure equipment stats and weapon info from the passed item object
    const stats = item.equipment;
    const weapon = item.weapon;

    return (
        // Tooltip wrapper with custom styles for width, text wrapping, font size, and z-index
        <Tooltip className="item-tooltip" style={{ maxWidth: "250px", whiteSpace: "normal", fontSize: "0.75rem", zIndex: "1050" }}>
            {/* Attack stats section */}
            <div>
                <strong>Attack:</strong>
            </div>
            <div>Stab: {stats.attack_stab}</div>
            <div>Slash: {stats.attack_slash}</div>
            <div>Crush: {stats.attack_crush}</div>
            <div>Magic: {stats.attack_magic}</div>
            <div>Ranged: {stats.attack_ranged}</div>

            {/* Horizontal divider to separate sections */}
            <hr className="my-1" />

            {/* Defence stats section */}
            <div>
                <strong>Defence:</strong>
            </div>
            <div>Stab: {stats.defence_stab}</div>
            <div>Slash: {stats.defence_slash}</div>
            <div>Crush: {stats.defence_crush}</div>
            <div>Magic: {stats.defence_magic}</div>
            <div>Ranged: {stats.defence_ranged}</div>

            {/* Another divider */}
            <hr className="my-1" />

            {/* Other bonuses and weapon speed section */}
            <div>
                <strong>Other/Bonuses:</strong>
            </div>
            <div>Strength Bonus: {stats.melee_strength}</div>
            <div>Ranged Strength: {stats.ranged_strength}</div>
            <div>Magic Bonus: {stats.magic_damage}%</div>
            <div>Prayer: {stats.prayer}</div>
            {/* Display weapon attack speed if available, otherwise show "N/A" */}
            <div>Speed: {weapon?.attack_speed ?? "N/A"}</div>
        </Tooltip>
    );
}

export default ItemTooltipCard;
