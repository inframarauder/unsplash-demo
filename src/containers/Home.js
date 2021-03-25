import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Header, ImageCard } from "../components";
import api from "../utils/api";

const Home = () => {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      (async () => {
        setLoading(true);
        try {
          const { response } = await api.photos.list({ page: 1, perPage: 6 });
          setState((state) => [...state, ...response.results]);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      })(),
    []
  );
  console.log(state);

  return (
    <Container>
      <Header page="home" />
      <hr className="divider" />
      <Row className="image-area">
        {!loading &&
          state.map((photo) => (
            <Col sm="4" key={photo.id}>
              <ImageCard url={photo.urls?.regular} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
