import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { ImageCard, Loader } from "../components";
import api from "../utils/api";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const listPhotos = useCallback(
    () =>
      (async () => {
        setLoading(true);
        try {
          const { response } = await api.photos.list({ page: 1, perPage: 6 });
          setPhotos(response.results);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      })(),
    []
  );

  useEffect(() => listPhotos(), [listPhotos]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "" || value.length === 0) {
      setShowClear(false);
    } else {
      setShowClear(true);
      setSearchText(e.target.value);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearchText("");
    setShowClear(false);
    if (isSearching) {
      setIsSearching(false);
      listPhotos();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchText.length > 0) {
      setLoading(true);
      setIsSearching(true);
      try {
        const { response } = await api.search.getPhotos({
          query: searchText,
          page: 1,
          perPage: 6,
        });

        setPhotos(response.results);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    } else {
      alert("Please enter something to search!");
    }
  };

  return (
    <Container>
      <h1 className="text-left">Home</h1>
      <small style={{ color: "#9999A2" }}>Photos for everyone...</small>
      <Form className="my-4" onSubmit={handleSubmit}>
        <Row>
          <Col lg="8">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchText}
                onChange={handleChange}
              />
              {showClear && (
                <InputGroup.Append>
                  <button className="clear-btn" onClick={handleClear}>
                    Clear
                  </button>
                </InputGroup.Append>
              )}
            </InputGroup>
          </Col>
          <Col lg="4">
            <Button variant="danger" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <hr className="divider" />
      {isSearching && <span>Showing results for '{searchText}'</span>}

      <Row className="image-area">
        {loading ? (
          <Loader />
        ) : (
          photos.map((photo) => (
            <Col sm="4" key={photo.id}>
              <ImageCard url={photo.urls?.regular} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
