import React from "react";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

function GearSlot({ slot, onClick, item, onClear, disabled = false }) {
    const iconPath = `./icons/${slot ? slot.charAt(0).toUpperCase() + slot.slice(1) : ""}_slot.png`;
    const itemIcon = item?.icon ? `data:image/png;base64,${item.icon}` : null;

    const content = (
        <div
            style={{
                position: "relative",
                width: "48px",
                height: "48px",
                opacity: disabled ? 0.4 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
            }}
        >
            <Image src={iconPath} style={{ width: "48px", height: "48px" }} />

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
                        pointerEvents: "none",
                    }}
                />
            )}
        </div>
    );

    return disabled ? (
        <OverlayTrigger placement="top" overlay={<Tooltip id={`tooltip-${slot}`}>Cannot equip shield with 2h weapon</Tooltip>}>
            <span>
                <Button style={{ padding: 0, border: "0px", backgroundColor: "black" }} disabled>
                    {content}
                </Button>
            </span>
        </OverlayTrigger>
    ) : (
        <Button
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault();
                if (onClear) onClear(slot);
            }}
            style={{ padding: 0, border: "0px", backgroundColor: "black" }}
        >
            {content}
        </Button>
    );
}

export default GearSlot;
