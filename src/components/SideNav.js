import React from "react";
import { Nav } from "react-bootstrap";

const SideNav = () => {
  return (
    <Nav defaultActiveKey="/" className="side-nav">
      <img src="/assets/unsplash-brands.svg" alt="brand" className="my-4" />
      <hr className="divider" />
      <Nav.Link href="/" className="side-nav-link">
        <img
          src="/assets/image-regular.svg"
          alt="img-reg"
          className="side-nav-icon"
        />
      </Nav.Link>
      <Nav.Link href="/contact" className="side-nav-link">
        <img
          src="/assets/envelope-open-text-solid.svg"
          alt="img-reg"
          className="side-nav-icon"
        />
      </Nav.Link>
    </Nav>
  );
};

export default SideNav;
