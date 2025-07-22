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

                            <CardText as="h4" className="mt-4">
                                🎯 Project Overview
                            </CardText>
                            <CardText>
                                The OSRS Gear Planner is a full-stack web application designed to help players of Old School RuneScape
                                build, test, and optimize gear setups. With real-time stat calculations and support for saving named
                                loadouts, it’s a powerful tool for both casual and experienced players.
                            </CardText>

                            <CardText as="h4" className="mt-4">
                                🧩 Key Features
                            </CardText>
                            <div>
                                <ul>
                                    <li>⚔️ Real-time combat stat updates and max hit calculations</li>
                                    <li>🧠 Support for custom bonuses and hybrid setups</li>
                                    <li>💾 Save & load named gear setups with optional tags</li>
                                    <li>📄 Detailed item pages with stat breakdowns</li>
                                    <li>🔄 Fast, responsive drag-and-drop gear slots</li>
                                    <li>🔗 Easy setup sharing for friends, clans, or planning sessions</li>
                                </ul>
                            </div>

                            <CardText as="h4" className="mt-4">
                                🛠️ Tech Stack
                            </CardText>
                            <CardText>
                                This project is built using <strong>React</strong> and <strong>Next.js</strong>, with a{" "}
                                <strong>MongoDB</strong> backend managed via API routes. All data is stored and processed locally for speed
                                and privacy—no login required.
                            </CardText>

                            <CardText as="h4" className="mt-4">
                                🧪 Why I Built This
                            </CardText>
                            <CardText>
                                As a web development student and OSRS fan, I created this planner as my capstone project. I wanted to solve
                                a real problem—making it easier to experiment with builds and understand gear meta—while learning the ins
                                and outs of a full-stack project. My goal was to build something useful, performant, and future-proof, and
                                ideally impress a few fellow players along the way.
                            </CardText>

                            <CardText as="h4" className="mt-4">
                                📦 How It Works
                            </CardText>
                            <CardText>
                                The app uses a custom-imported item dataset sourced from the community-driven OSRS Reboxed database. I wrote
                                scripts to clean, normalize, and seed the data into MongoDB, ensuring consistent structure with the frontend
                                display.
                            </CardText>

                            <CardText as="h4" className="mt-4">
                                💡 Future Improvements
                            </CardText>
                            <div>
                                <ul>
                                    <li>📈 Add support for PvP modifiers and potion boosts</li>
                                    <li>📲 Shareable setup links with preview embeds</li>
                                    <li>🧪 Mobile-friendly design tweaks</li>
                                    <li>🔍 More advanced filtering and gear comparison tools</li>
                                </ul>
                            </div>

                            <CardText as="h4" className="mt-4">
                                🙋 About the Developer
                            </CardText>
                            <CardText>
                                I'm <strong>James Pagliaccio</strong>, a developer with a passion for building interactive, player-focused
                                tools. This planner was a deep dive into scalable design and real-time feedback systems, and I'm excited to
                                expand it over time. Check out more of my work on{" "}
                                <a href="https://github.com/JamesP-GitH" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                                !
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
