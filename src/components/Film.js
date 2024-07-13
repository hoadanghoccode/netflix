import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/film.css"; // Import your CSS file
import { useParams } from "react-router-dom";
import axios from "axios";

const Film = () => {
  const { name } = useParams();
  const [film, setFilm] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(0);

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

  const changeEpisode = (index) => {
    setCurrentEpisode(index);
  };

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="film-container">
        <div className="video-container">
          <iframe
            title={`Tập ${film.episodes[0].items[currentEpisode].name}`}
            width="560"
            height="315"
            src={film.episodes[0].items[currentEpisode].embed}
            allowFullScreen
          ></iframe>
        </div>
        <div className="episode-list">
          {film.episodes[0].items.map((episode, index) => (
            <button
              key={index}
              onClick={() => changeEpisode(index)}
              className={currentEpisode === index ? "active" : ""}
            >
              Tập {episode.name}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Film;
