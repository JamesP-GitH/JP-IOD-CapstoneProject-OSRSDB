import React from "react";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

// GearSlot component represents a single equipment slot (e.g., head, weapon, shield)
function GearSlot({ slot, onClick, item, onClear, disabled = false }) {
    // Path to the background image for the slot (e.g., helmet icon)
    const iconPath = `./icons/${slot ? slot.charAt(0).toUpperCase() + slot.slice(1) : ""}_slot.png`;

    // If an item is equipped, convert its base64 icon into a usable image source
    const itemIcon = item?.icon ? `data:image/png;base64,${item.icon}` : null;

    // Main content shown inside the button (slot background + optionally the item icon)
    const content = (
        <div
            style={{
                position: "relative",
                width: "48px",
                height: "48px",
                opacity: disabled ? 0.4 : 1, // Dim slot if disabled
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            {/* Background icon representing the slot type */}
            <Image src={iconPath} style={{ width: "48px", height: "48px" }} />

            {/* If an item is equipped, overlay its icon */}
            {itemIcon && (
                <Image
                    src={itemIcon}
                    alt={item.name}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        marginLeft: "3px",
                        width: "44px",
                        height: "44px",
                        objectFit: "contain",
                        pointerEvents: "none", // Prevent interaction with the item image
                    }}
                />
            )}
        </div>
    );

    // If the slot is disabled (e.g., shield slot with a 2H weapon), show tooltip
    if (disabled) {
        return (
            <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${slot}`}>Cannot equip shield with 2h weapon</Tooltip>}>
                {/* span wrapper is needed because disabled buttons don’t trigger tooltips in Bootstrap */}
                <span>
                    <Button style={{ padding: 0, border: "0px", backgroundColor: "black" }} disabled>
                        {content}
                    </Button>
                </span>
            </OverlayTrigger>
        );
    }

    // Default case: interactive gear slot button
    return (
        <Button
            onClick={onClick} // Left-click to set active slot
            onContextMenu={(e) => {
                e.preventDefault(); // Prevent right-click menu
                if (onClear) onClear(slot); // Right-click to clear item
            }}
            style={{ padding: 0, border: "0px", backgroundColor: "black" }}
        >
            {content}
        </Button>
    );
}

export default GearSlot;
