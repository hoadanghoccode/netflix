import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "../css/blogpage.css";
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Filterbycheckbox from "./Filterbycheckbox";
import Filterbyradio from "./Filterbyradio";

const Blogpage = () => {
  const [blog, setBlog] = useState([]);
  const [top3item, setTop3item] = useState([]);
  const [queryCheckbox, setQueryCheckbox] = useState("");
  const [queryRadio, setQueryRadio] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentpage] = useState(1);
  const item = 6;
  const indexOfLastItem = currentPage * item;
  const indexOfFirstItem = indexOfLastItem - item;

  const paginate = (pageNumber) => setCurrentpage(pageNumber);

  useEffect(() => {
    // Fetch all blog posts
    axios
      .get("http://localhost:9999/posts")
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch top 3 newest posts
    const fetchTop3Items = async () => {
      try {
        const response = await axios.get("http://localhost:9999/posts");
        const sortedItems = response.data.sort((a, b) => b.id - a.id);
        setTop3item(sortedItems.slice(0, 3));
      } catch (error) {
        console.error("Error fetching top 3 items:", error);
      }
    };

    fetchTop3Items();
  }, []);

  const handleQuery = useCallback((sql) => {
    setQueryCheckbox(sql);
  }, []);

  const handleQueryCheckbox = useCallback((sql) => {
    setQueryRadio(sql);
  }, []);

  const filteredPost = blog.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const combinedSql = [queryCheckbox, queryRadio].filter(Boolean).join("&");
    const url = combinedSql
      ? `http://localhost:9999/posts/?${combinedSql}`
      : "http://localhost:9999/posts";

    axios
      .get(url)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [queryCheckbox, queryRadio]);
  const currentBlog = filteredPost.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPost.length / item); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Header />
      <Container className="blogpage-content my-4">
        <Row>
          <Col md={9}>
            <div className="d-flex justify-content-between align-items-center">
              <h2>All Articles</h2>
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="search-icon">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            <Row className="mt-4">
              {currentBlog.map((post) => (
                <Col key={post.id} lg={6} className="mb-4">
                  <div className="card h-100">
                    <img
                      src={post.img_url}
                      className="card-img-top"
                      alt="Blog post"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">{post.content}</p>
                      <Link
                        to={`/blogdetail/${post.id}`}
                        className="btn btn-primary"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
              <Pagination className="justify-content-center">
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    onClick={() => paginate(number)}
                    active={number === currentPage}
                  >
                    {number}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Row>
          </Col>
          <Col md={3}>
            <div className="tags">
              <h2>Tags</h2>
              <Filterbycheckbox query={handleQuery} />
            </div>
            <div className="tags">
              <h2>Author</h2>
              <Filterbyradio query={handleQueryCheckbox} />
            </div>
            <div className="recent-posts">
              <h2>Recent Posts</h2>
              {top3item.map((post) => (
                <div key={post.id} className="mb-3">
                  <div className="card">
                    <img
                      src={post.img_url}
                      className="card-img-top"
                      alt="Recent post"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <Link to={`/`} className="btn btn-primary">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Blogpage;
