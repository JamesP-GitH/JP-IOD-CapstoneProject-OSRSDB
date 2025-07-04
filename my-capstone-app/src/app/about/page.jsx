import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from "react-bootstrap";

export default function About() {
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <CardBody>
                            <CardTitle as="h2">About the OSRS Gear Planner</CardTitle>
                            <CardText>Welcome to the Old School RuneScape Gear Planner — a tool built by players, for players.</CardText>
                            <CardText>
                                Whether you're gearing up for a PvP battle, preparing for a raid, or just optimizing your skilling setup,
                                this planner helps you visualize, save, and share your ideal gear setups.
                            </CardText>
                            <CardText>Features include:</CardText>
                            <ul>
                                <li>Drag-and-drop gear slots</li>
                                <li>Combat stat breakdowns</li>
                                <li>Loadouts for PvP, PvM, and skilling</li>
                                <li>Easy sharing with friends or clans</li>
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
