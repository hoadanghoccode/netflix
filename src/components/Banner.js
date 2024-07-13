import React, { useState, useEffect } from "react";
import "../css/banner.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  // Define video and image sources with keywords
  const videoSources = [
    { src: "./video/video1.mp4", keyword: "khu-vuon-ngon-tu" },
    { src: "./video/video2.mp4", keyword: "one-piece-film-red" },
    { src: "./video/video3.mp4", keyword: "toi-thang-cap-mot-minh" },
  ];

  const imageSources = [
    { src: "./images/title1.png", keyword: "khu-vuon-ngon-tu" },
    { src: "./images/title2.png", keyword: "one-piece-film-red" },
    { src: "./images/title3.png", keyword: "toi-thang-cap-mot-minh" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch movies data for each video source keyword
        const requests = videoSources.map((video) =>
          axios.get(
            `https://phim.nguonc.com/api/films/search?keyword=${video.keyword}`
          )
        );
        const responses = await axios.all(requests);

        // Combine all movies into a single array
        let allMovies = [];
        responses.forEach((response) => {
          allMovies = [...allMovies, ...response.data.items];
        });

        // Set movies state with all fetched movies
        setMovies(allMovies);

        if (allMovies.length > 0) {
          // Select a random movie from the fetched movies
          const randomIndex = Math.floor(Math.random() * allMovies.length);
          const selectedMovie = allMovies[randomIndex];
          setSelectedMovie(selectedMovie);

          // Find corresponding video and image based on selected movie's name
          const selectedVideo = videoSources.find(
            (video) => video.keyword === selectedMovie.slug
          );
          setSelectedVideo(
            selectedVideo ? selectedVideo.src : videoSources[randomIndex].src
          );

          const selectedImage = imageSources.find(
            (image) => image.keyword === selectedMovie.slug
          );
          setSelectedImage(
            selectedImage ? selectedImage.src : imageSources[randomIndex].src
          );

          console.log("Selected Movie:", selectedMovie);
          console.log("Selected Video:", selectedVideo);
          console.log("Selected Image:", selectedImage);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Call fetchMovies function when component mounts
    fetchMovies();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Render null if selectedVideo, selectedImage, or selectedMovie is null or undefined
  if (!selectedVideo || !selectedImage || !selectedMovie) {
    return null;
  }

  // Render banner component with selected video, image, and movie details
  return (
    <div className="banner-container">
      <video autoPlay loop muted playsInline className="background-clip">
        <source src={selectedVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container>
        <div className="description">
          <img className="banner-logo" src={selectedImage} alt="abc" />
          <h2>{selectedMovie.name}</h2>
          <p>{selectedMovie.description}</p>
          <Link
            className="btn play-btn"
            to={`/film/${selectedMovie.slug}/watch`}
          >
            <i className="bi bi-play-fill"></i> Start
          </Link>
          <Link className="btn detail-btn" to={`/film/${selectedMovie.slug}`}>
            <i className="bi bi-info-circle"></i> Detail
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
