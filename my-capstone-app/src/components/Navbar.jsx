"use client";

import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppNavbar() {
    const pathname = usePathname();

    return (
        <>
            <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom-navbar shadow-sm">
                <Container>
                    <Link href="/" className="navbar-brand custom-brand">
                        🛡️ OSRS Gear Planner
                    </Link>

                    <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />

                    <BootstrapNavbar.Collapse id="main-navbar-nav">
                        <Nav className="ms-auto">
                            <Link href="/gear-planner" passHref>
                                <Nav.Link as="span" className={pathname === "/gear-planner" ? "active-link" : ""}>
                                    Plan Gear
                                </Nav.Link>
                            </Link>

                            <Link href="/my-setups" passHref>
                                <Nav.Link as="span" className={pathname === "/my-setups" ? "active-link" : ""}>
                                    My Setups
                                </Nav.Link>
                            </Link>

                            <Link href="/about" passHref>
                                <Nav.Link as="span" className={pathname === "/about" ? "active-link" : ""}>
                                    About
                                </Nav.Link>
                            </Link>
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </Container>
            </BootstrapNavbar>

            <style jsx>{`
                .custom-navbar {
                    background: linear-gradient(90deg, #1a1a2e, #16213e);
                    font-family: "Cinzel", serif;
                }

                .custom-brand {
                    font-weight: 700;
                    font-size: 1.5rem;
                    letter-spacing: 1.5px;
                    user-select: none;
                }

                .nav-link {
                    font-weight: 500;
                    font-size: 1.1rem;
                    transition: color 0.3s ease;
                    cursor: pointer;
                    padding: 0.5rem 1rem;
                }

                .nav-link:hover {
                    color: #f0c419; /* OSRS gold-ish accent */
                }

                .active-link {
                    color: #f0c419 !important;
                    font-weight: 700;
                    border-bottom: 2px solid #f0c419;
                }

                /* Toggle button color override */
                .navbar-dark .navbar-toggler {
                    border-color: #f0c419;
                }

                .navbar-dark .navbar-toggler-icon {
                    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%23f0c419' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
                }
            `}</style>
        </>
    );
}

export default AppNavbar;
