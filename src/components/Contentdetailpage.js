import React, { useEffect, useState } from "react";
import "../css/contentdetailpage.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Contentdetailpage = () => {
  const { name } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    axios
      .get(`https://phim.nguonc.com/api/film/${name}`)
      .then((response) => {
        setFilm(response.data.movie);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="content-page">
      <Row>
        <Col className="col-4 content-img">
          <img src={film.thumb_url} alt="film-poster" />
        </Col>
        <Col className="col-8">
          <div className="content-details">
            <h1>{film.name}</h1>
            <h2>
              {film.quality} ● {film.language}
            </h2>
            <p>
              <strong>Số tập:</strong> {film.total_episodes} |{" "}
              <strong>Hiện tại:</strong> {film.current_episode}
            </p>
            <p>
              <strong>Thể loại:</strong>
              {Object.values(film.category).map((cat, index) => (
                <span key={index}>
                  {cat.list.map((item, idx) => (
                    <span key={idx}>
                      {item.name}
                      {idx < cat.list.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {index < Object.values(film.category).length - 1 ? " ● " : ""}
                </span>
              ))}
            </p>
            <p className="white-color content-description">
              {film.description}
            </p>
            <p>
              <strong>Dàn diễn viên:</strong>{" "}
              <span className="white-color">
                {film.casts ? film.casts : "Đang cập nhật"}
              </span>
            </p>
            <p>
              <strong>Đạo diễn:</strong>{" "}
              <span className="white-color">
                {film.director ? film.director : "Đang cập nhật"}
              </span>
            </p>
            <Link className="btn play-btn my-4" to={`watch`}>
              <i className="bi bi-play-fill"></i> Start
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contentdetailpage;
