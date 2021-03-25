import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const HomeHeader = () => {
  return (
    <>
      <h1 className="text-left">Home</h1>
      <small style={{ color: "#9999A2" }}>Photos for everyone...</small>
      <Form className="my-4">
        <Row>
          <Col lg="8">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="search-bar"
              />
            </Form.Group>
          </Col>
          <Col lg="4">
            <Button variant="danger">Search</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const ContactHeader = () => {
  return (
    <>
      <h1 className="text-left">Contact Us</h1>
    </>
  );
};

const Header = ({ page }) => {
  return page === "home" ? <HomeHeader /> : <ContactHeader />;
};

export default Header;
