"use client";

import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppNavbar() {
    const pathname = usePathname();
    return (
        <BootstrapNavbar bg="light" expand="lg" className="mb-1">
            <Container>
                <Link href="/" className="navbar-brand">
                    OSRS Gear Planner
                </Link>
                <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />
                <BootstrapNavbar.Collapse id="main-navbar-nav">
                    <Nav className="ms-auto">
                        <Link href="/gear-planner">
                            <Nav.Link active={pathname === "/gear-planner"} as="span">
                                Plan Gear
                            </Nav.Link>
                        </Link>
                        <Link href="/my-setups">
                            <Nav.Link active={pathname === "/my-setups"} as="span">
                                My Setups
                            </Nav.Link>
                        </Link>
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
