import React from "react";
import { Card, Row, Col, OverlayTrigger, Image } from "react-bootstrap";
import ItemTooltipCard from "./ItemTooltipCard";
import Link from "next/link";

// Component to render a clickable card showing basic item info
function ItemCard({ item, onClick }) {
    if (!item) return null; // Don't render anything if there's no item data

    return (
        <OverlayTrigger
            placement="left"
            delay={{ show: 200, hide: 100 }} // Delay before showing/hiding tooltip
            overlay={ItemTooltipCard(item)} // The tooltip content
            containerPadding={10} // Padding around the container to avoid clipping
            popperConfig={{
                modifiers: [
                    {
                        name: "preventOverflow", // Prevent tooltip from going out of the viewport
                        options: { boundary: "viewport" },
                    },
                ],
            }}
        >
            <div>
                {/* Card container for item */}
                <Card className="item-card mb-1" onClick={onClick} style={{ height: "52px" }}>
                    <Card.Body className="py-2 px-3 d-flex align-items-center">
                        <Row>
                            <Col xs="auto">
                                {
                                    <Image
                                        src={`data:image/png;base64,${item.icon}`} // Render base64-encoded item icon
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        fluid
                                    ></Image>
                                }
                            </Col>

                            {/* Item name and metadata */}
                            <Col>
                                <Card.Title className="item-name fw-semibold mb-1" style={{ fontSize: "1.1vw" }}>
                                    <Link
                                        href={`/item/${item._id}`} // Link to item details page
                                        className="item-link text-dark"
                                        onClick={(e) => e.stopPropagation()} // Prevent link click from triggering card click
                                    >
                                        {item.wiki_name}
                                    </Link>
                                </Card.Title>

                                {/* Additional metadata like ID and member status */}
                                <Card.Subtitle className="item-meta text-muted small" style={{ fontSize: "1.1vw" }}>
                                    ID: {item._id ?? "N/A"} | Members: {item.members ? "Yes" : "No"}
                                </Card.Subtitle>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </OverlayTrigger>
    );
}

export default ItemCard;
