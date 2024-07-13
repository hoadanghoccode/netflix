import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import "../css/newfilm.css";
import axios from "axios";

const Featurefilm = () => {
  const [film, setFilm] = useState([]);
  useEffect(() => {
    axios
      .get("https://phim.nguonc.com/api/films/phim-moi-cap-nhat?page=1")
      .then((response) => {
        setFilm(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(film);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const cardChunks = chunkArray(film, 4); // Adjust the number 3 to display more or fewer cards per slide

  return (
    <>
      <Container className="newfilm-content my-5">
        <h1 className="">Phim mới cập nhật</h1>
        <div className="card-slider-container">
          <Carousel controls={true} indicators={false}>
            {cardChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <Container>
                  <Row style={{ color: "red" }}>
                    {chunk.map((card) => (
                      <Col key={card.id} sm={3}>
                        <Card className="card">
                          <div className="card-img-container">
                            <a href="/">
                              <Card.Img
                                variant="top"
                                src={card.thumb_url}
                                alt={card.name}
                                className="card-img"
                              />
                            </a>
                            <div className="card-title-overlay">
                              <a href="/">
                                <Card.Title>{card.name}</Card.Title>
                              </a>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>
    </>
  );
};

export default Featurefilm;
