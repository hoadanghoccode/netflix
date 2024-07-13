import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../css/search.css";

const Search = () => {
  const [films, setFilms] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`https://phim.nguonc.com/api/films/search?keyword=${name}`)
      .then((response) => {
        setFilms(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  return (
    <>
      <Header />
      <div className="container container-search">
        <Row className="justify-content-center">
          {films.map((film) => (
            <Col className="col-3" key={film.id}>
              <Card className="card">
                <div className="card-img-container">
                  <Link to={`/film/${film.slug}/watch`}>
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
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default Search;
