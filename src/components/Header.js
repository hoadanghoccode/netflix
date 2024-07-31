import React, { useState, useEffect } from "react";
import "../css/header.css"; // Create and import CSS for the header
import { Container, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState(null); // State to manage the user role
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    if (search.trim() !== "") {
      axios
        .get(`https://phim.nguonc.com/api/films/search?keyword=${search}`)
        .then((response) => {
          // Handle the response data if needed
          navigate(`/film/${search}/search`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setRole(null);
    navigate("/");
  };

  return (
    <>
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <Container className="d-flex align-items-center justify-content-between">
          <nav>
            <div className="logo">
              <a href="/">Netflix</a>
            </div>
            <ul>
              <li>
                <Link to={`/country`}>Country</Link>
              </li>
              <li>
                <Link to={`/film`}>Film</Link>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>

              <li>
                <a href="/favourite">favourite</a>
              </li>
              <li>
                <a href="/test">test</a>
              </li>
            </ul>
          </nav>
          <nav className="right-side d-flex align-items-center">
            <div className="search-login-container d-flex align-items-center">
              <Form
                className="d-flex align-items-center"
                onSubmit={handleSearch}
              >
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
              {role ? (
                <Button
                  variant="outline-light"
                  className="ml-2 login-button"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    as={Link}
                    variant="outline-light"
                    className="ml-2 login-button"
                    to={`/login`}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    variant="outline-light"
                    className="ml-2 login-button"
                    to={`/register`}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
