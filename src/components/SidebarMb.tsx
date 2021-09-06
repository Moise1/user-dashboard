import React from "react";
import logo from "../assets/logo.svg";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
function SidebarMb(props: any) {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} height={50} alt="logo" />
            <span className=" pl-2 font-weight-bold d-blue">HGR</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-fit">
              <Nav.Link href="#home">Dashboard</Nav.Link>
              <Nav.Link href="#link">Catalog</Nav.Link>
              <Nav.Link href="#link">List now</Nav.Link>
              <Nav.Link href="/home">Listings</Nav.Link>
              <Nav.Link href="#link">Settings</Nav.Link>
              <Nav.Link href="#link">Services</Nav.Link>
              <Nav.Link href="#link">Help</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default SidebarMb;
