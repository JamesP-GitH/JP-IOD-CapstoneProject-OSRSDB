"use client";

import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppNavbar() {
    // Get the current pathname from Next.js router
    const pathname = usePathname();

    return (
        // Bootstrap Navbar component with light background and expandable on large screens
        <BootstrapNavbar bg="light" expand="lg" className="mb-1">
            <Container>
                {/* Logo linking to the home page */}
                <Link href="/" className="navbar-brand">
                    OSRS Gear Planner
                </Link>

                {/* Toggle button for collapsing navbar on smaller screens */}
                <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />

                {/* Collapsible navbar content (links) */}
                <BootstrapNavbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Link to Gear Planner page */}
                        <Link href="/gear-planner">
                            <Nav.Link active={pathname === "/gear-planner"} as="span">
                                Plan Gear
                            </Nav.Link>
                        </Link>

                        {/* Link to My Setups page */}
                        <Link href="/my-setups">
                            <Nav.Link active={pathname === "/my-setups"} as="span">
                                My Setups
                            </Nav.Link>
                        </Link>

                        {/* Link to About page */}
                        <Link href="/about">
                            <Nav.Link active={pathname === "/about"} as="span">
                                About
                            </Nav.Link>
                        </Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default AppNavbar;
