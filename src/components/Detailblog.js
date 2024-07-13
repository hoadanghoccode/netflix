import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Comment from "./Comment";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../css/detailblog.css"; // Import the CSS file

const Detailblog = () => {
  const [blog, setBlog] = useState("");
  const [top3item, setTop3item] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Fetch the blog post by id
    axios
      .get(`http://localhost:9999/posts/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    // Fetch all blog posts
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

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={9}>
            <div className="blog-detail">
              <img src={blog.img_url} className="img-fluid" alt="Blog post" />
              <h1>{blog.title}</h1>
              <div className="blog-content mt-4">
                <p>{blog.content}</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
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
        <Row>
          <Comment />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Detailblog;
