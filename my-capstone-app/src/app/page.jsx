"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Link from "next/link";

export default function HomePage() {
    return (
        <Container className="text-center py-5">
            <Row>
                <Col>
                    <h1 className="display-4 mb-3">Welcome to the Gear Planner</h1>
                    <p className="lead mb-4">Plan, manage, and save your favorite gear setups.</p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link href="/gear-planner">
                            <Button variant="primary" size="lg">
                                Start Planning
                            </Button>
                        </Link>
                        <Link href="/my-setups">
                            <Button variant="outline-secondary" size="lg">
                                My Setups
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button variant="link" size="lg">
                                About
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
