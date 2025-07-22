"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

// Main landing page component
export default function HomePage() {
    return (
        <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
            <Container>
                <Row>
                    <Col>
                        {/* Title and subtitle */}
                        <h1 className="display-3 fw-bold mb-3">🛡️ OSRS Gear Planner</h1>
                        <p className="lead mb-4">Build, tweak, and save your ideal gear setups — whether for PvM, PvP, or skilling.</p>

                        {/* Navigation buttons */}
                        <div className="d-flex justify-content-center gap-3 flex-wrap">
                            {/* Start Planning button */}
                            <Link href="/gear-planner" passHref>
                                <Button variant="primary" size="lg" className="px-4 shadow">
                                    Start Planning
                                </Button>
                            </Link>

                            {/* My Setups button */}
                            <Link href="/my-setups" passHref>
                                <Button variant="outline-light" size="lg" className="px-4">
                                    My Setups
                                </Button>
                            </Link>

                            {/* About / Learn More button */}
                            <Link href="/about" passHref>
                                <Button variant="link" size="lg" className="text-white">
                                    Learn More
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Scoped CSS for styling this page */}
            <style jsx>{`
                .hero-section {
                    min-height: calc(100vh - 56px);
                    background: linear-gradient(to right, #1e1e2f, #2e2e42);
                    padding: 0 0 0px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                h1 {
                    font-family: "Cinzel", serif;
                }

                p.lead {
                    font-size: 1.25rem;
                    max-width: 600px;
                    margin: 0 auto 30px;
                }

                .btn-primary {
                    background-color: #4a90e2;
                    border-color: #4a90e2;
                }

                .btn-primary:hover {
                    background-color: #357ab7;
                    border-color: #357ab7;
                }

                .btn-outline-light:hover {
                    background-color: white;
                    color: #2e2e42;
                }
            `}</style>
        </div>
    );
}
