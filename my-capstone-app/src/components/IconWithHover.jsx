"use client";

import React, { useState } from "react";
import { Image, Modal, ModalTitle, ModalHeader, ModalBody, OverlayTrigger, Tooltip } from "react-bootstrap";

// IconWithHover displays an icon with a tooltip, and opens a high-res modal image when clicked
function IconWithHover({ icon, wiki_url, alt }) {
    const [showModal, setShowModal] = useState(false); // Modal open/close state

    // Extract the high-res image URL from a given OSRS wiki URL
    function getHighResImageUrl(wiki_url) {
        if (!wiki_url) return null;

        // Extract the page name after "/w/" using RegExp
        const match = wiki_url.match(/\/w\/([^#]+)/);
        if (!match) return null;

        const pageTitle = match[1];
        const encodedTitle = encodeURIComponent(pageTitle); // Encode for URL safety

        // OSRS Wiki convention for high-res images: `${pageTitle}_detail.png`
        return `https://oldschool.runescape.wiki/images/${encodedTitle}_detail.png`;
    }

    const highResUrl = getHighResImageUrl(wiki_url);

    return (
        <>
            {/* Icon display with hover tooltip */}
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="icon-tooltip">Click to open large image</Tooltip>}>
                <Image
                    src={`data:image/png;base64,${icon}`} // Inline base64 icon from item data
                    alt={alt}
                    width={36}
                    height={"auto"}
                    rounded
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)} // Open modal on click
                    className="mx-2"
                />
            </OverlayTrigger>

            {/* Modal showing the high-res image */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)} // Close modal on "X" or backdrop click
                centered
                size="lg"
                contentClassName="bg-dark text-white"
                scrollable={false}
                backdrop={true}
                keyboard={true}
                restoreFocus={false}
                enforceFocus={false}
                autoFocus={false}
                dialogClassName="no-scroll-comp"
            >
                <ModalHeader closeButton>
                    <ModalTitle>{alt}</ModalTitle>
                </ModalHeader>
                <ModalBody className="text-center">
                    {highResUrl ? (
                        <img src={highResUrl} alt={`${alt} high res`} style={{ maxWidth: "300px", maxHeight: "400px", opacity: 1 }} />
                    ) : (
                        <p>High-res image not available</p> // Fallback message if no image is found
                    )}
                </ModalBody>
            </Modal>
        </>
    );
}

export default IconWithHover;
