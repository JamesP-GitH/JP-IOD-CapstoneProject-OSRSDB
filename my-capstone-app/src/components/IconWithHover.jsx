"use client";

import React, { useState } from "react";
import { Image, Modal, ModalTitle, ModalHeader, ModalBody, OverlayTrigger, Tooltip } from "react-bootstrap";

function IconWithHover({ icon, wiki_url, alt }) {
    const [showModal, setShowModal] = useState(false);

    function getHighResImageUrl(wiki_url) {
        if (!wiki_url) return null;

        const match = wiki_url.match(/\/w\/([^#]+)/);
        if (!match) return null;

        const pageTitle = match[1];
        const encodedTitle = encodeURIComponent(pageTitle);

        return `https://oldschool.runescape.wiki/images/${encodedTitle}_detail.png`;
    }

    const highResUrl = getHighResImageUrl(wiki_url);

    return (
        <>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="icon-tooltip">Click to open large image</Tooltip>}>
                <Image
                    src={`data:image/png;base64,${icon}`}
                    alt={alt}
                    width={36}
                    height={"auto"}
                    rounded
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowModal(true)}
                    className="mx-2"
                />
            </OverlayTrigger>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
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
                        <img src={highResUrl} alt={`${alt} high res`} style={{ width: "auto", maxHeight: "500px", opacity: 1 }} />
                    ) : (
                        <p>High-res image not available</p>
                    )}
                </ModalBody>
            </Modal>
        </>
    );
}

export default IconWithHover;
