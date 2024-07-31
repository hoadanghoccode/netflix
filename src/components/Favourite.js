import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Favourite = () => {
  const [favourite, setFavourite] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Fetch favorite slugs
    axios
      .get(`http://localhost:9999/favourite`)
      .then((response) => {
        setFavourite(response.data); // Set favorite slugs
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Fetch film details for each favorite slug
    const fetchFilms = async () => {
      try {
        const filmRequests = favourite.map((fav) =>
          axios.get(`https://phim.nguonc.com/api/film/${fav.slug}`)
        );
        const responses = await Promise.all(filmRequests);
        const filmsData = responses.map((res) => res.data.movie);
        setFilms(filmsData); // Set films data
      } catch (error) {
        console.log(error);
      }
    };

    if (favourite.length > 0) {
      fetchFilms();
    }
  }, [favourite]);

  // Function to handle deletion of a film from favorites
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:9999/favourite/${id}`);
        setFavourite((prevFavourite) =>
          prevFavourite.filter((fav) => fav.id !== id)
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "60px" }}>
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
              <div className="d-flex justify-content-center">
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDelete(index + 1)}
                >
                  <i className="bi bi-trash3"></i>
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Favourite;
