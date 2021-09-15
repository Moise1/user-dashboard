import React from "react";
import logo from "../assets/logo.svg";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../translation.json";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
function SidebarMb(props: any) {
  setTranslations({ en });
  setDefaultLanguage("en");
  const t = useTranslation();
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} height={50} alt="logo" />
            <span className=" pl-2 font-weight-bold d-blue">{t("HGR")}</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-fit">
              <Nav.Link href="#home"> {t("ds")}</Nav.Link>
              <Nav.Link href="#link"> {t("cat")}</Nav.Link>
              <Nav.Link href="#link"> {t("ln")}</Nav.Link>
              <Nav.Link href="/home"> {t("ls")}</Nav.Link>
              <Nav.Link href="#link">{t("set")}</Nav.Link>
              <Nav.Link href="#link"> {t("srvc")}</Nav.Link>
              <Nav.Link href="#link"> {t("hlp")}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default SidebarMb;
