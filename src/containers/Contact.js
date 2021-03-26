import React, { useState, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { Loader } from "../components";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", query: "" });
  const [uploads, setUploads] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setUploads([...uploads, ...acceptedFiles]);
    },
    [uploads]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const files = uploads.map((file) => (
    <li key={file.path}>
      <img
        src={URL.createObjectURL(file)}
        alt="upload"
        className="upload-img-preview"
      />
    </li>
  ));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({ ...formData, email: "", query: "" });
    setUploads([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = new FormData();
    postData.append("email", formData.email);
    postData.append("query", formData.query);
    uploads.forEach((upload, i) =>
      postData.append(`attachment${i + 1}`, upload)
    );

    axios
      .post("https://sendemailapi.glitch.me", postData)
      .then(() => {
        setLoading(false);
        handleShow();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Container>
      <h1 className="text-left">Contact Us</h1>
      <small style={{ color: "#9999A2" }}>
        Report Problems, request photos, and any other queries.
      </small>
      <Row>
        <Col sm={6}>
          {loading ? (
            <Loader />
          ) : (
            <Form className="my-4" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ color: "#E94560" }}>
                  E-MAIL ADDRESS*
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Your E-Mail Address"
                  className="form-field"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: "#E94560" }}>QUERY*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Type your query here..."
                  className="form-field"
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label style={{ color: "#E94560" }}>
                  IMAGE ATTACHMENTS
                </Form.Label>
                <section className="drag-n-drop">
                  <div
                    {...getRootProps({ className: "dropzone center-content" })}
                  >
                    <input {...getInputProps()} />
                    <p className="text-center">Drag files here to upload</p>
                  </div>
                  <aside>
                    <hr />
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        listStyleType: "none",
                      }}
                    >
                      {files}
                    </ul>
                  </aside>
                </section>
              </Form.Group>
              <Button
                variant="secondary"
                style={{ float: "left" }}
                className="my-4"
                onClick={() => handleClear()}
              >
                Clear
              </Button>
              <Button
                variant="danger"
                style={{ float: "right" }}
                className="my-4"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Col>
        <Col sm={6}>
          <div className="random-styles"></div>
          <p className="text-center my-4" style={{ color: "#AFBBCA" }}>
            Unsplash
          </p>
        </Col>
      </Row>

      <Modal
        centered
        show={show}
        onHide={handleClose}
        className="center-content"
      >
        <div className="confirm-modal text-center">
          <Modal.Body>
            <img
              src="/assets/unsplash-brands.svg"
              alt="brand"
              className="modal-img"
            />
            <h4>Your query was submitted!</h4>
            <p>
              Thank you! We'll get in touch regarding your query via the
              submitted e-mail address.
            </p>
            <p>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
            </p>
          </Modal.Body>
        </div>
      </Modal>
    </Container>
  );
};

export default Contact;
