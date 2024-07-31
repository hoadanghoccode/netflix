import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../css/listfilm.css";
import Newfilm from "./Newfilm";
import Currentfilm from "./Currentfilm";
import Shortfilm from "./Shortfilm";
import Longfilm from "./Longfilm";
import TVshowslist from "./TVshowslist";

const Listfilm = () => {
  const [films, setFilms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectChange = (event) => {
    setSelectedCategory(event);
    setFilms([]);
    setPage(1);
  };

  const lastFilmElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9999/film_catgory")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get(
          `https://phim.nguonc.com/api/films/the-loai/${selectedCategory}?page=${page}`
        );
        setFilms((prevFilms) => [...prevFilms, ...response.data.items]);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedCategory) {
      fetchFilms();
    }
  }, [page, selectedCategory]);

  return (
    <div>
      <Container>
        <Header />
        <Row style={{ marginTop: "60px" }}>
          <Col className="col-2">
            <h1>Phim:</h1>
            <DropdownButton
              className="custom-dropdown"
              id="dropdown-basic"
              title={
                selectedCategory
                  ? categories.find(
                      (category) => category.slug === selectedCategory
                    ).name
                  : "Thể loại"
              }
              onSelect={handleSelectChange}
            >
              {categories.map((category) => (
                <Dropdown.Item
                  key={category.id}
                  eventKey={category.slug}
                  style={{ color: "white" }}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col className="col-10">
            {selectedCategory ? (
              <Row xs={1} md={2} lg={4}>
                {films.map((film, index) => (
                  <Col key={index} className="mb-4">
                    <Card className="card">
                      <div className="card-img-container">
                        <Link to={`/film/${film.slug}`}>
                          <Card.Img
                            variant="top"
                            src={film.thumb_url}
                            alt={film.name}
                            className="card-img"
                          />
                        </Link>
                        <div className="card-title-overlay">
                          <Link to={`/film/${film.slug}`}>
                            <Card.Title>{film.name}</Card.Title>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
                <div ref={lastFilmElementRef}></div>
              </Row>
            ) : (
              <>
                <Newfilm />
                <Currentfilm />
                <Shortfilm />
                <Longfilm />
                <TVshowslist />
              </>
            )}
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
};

export default Listfilm;
