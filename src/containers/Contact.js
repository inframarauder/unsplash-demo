import React, { useState, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const Contact = () => {
  const [formData, setFormData] = useState({ email: "", query: "" });
  const [uploads, setUploads] = useState([]);

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
    const postData = new FormData();
    postData.append("email", formData.email);
    postData.append("query", formData.query);
    uploads.forEach((upload, i) =>
      postData.append(`attachment${i + 1}`, upload)
    );

    axios
      .post("http://localhost:5000", postData)
      .then(() => alert("sent"))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1 className="text-left">Contact Us</h1>
      <small style={{ color: "#9999A2" }}>
        Report Problems, request photos, and any other queries.
      </small>
      <Row>
        <Col sm={6}>
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
        </Col>
        <Col sm={6}>
          <div className="random-styles"></div>
          <p className="text-center my-4" style={{ color: "#AFBBCA" }}>
            Unsplash
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
