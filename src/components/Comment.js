import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../css/comment.css";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const { id } = useParams();
  const { userId } = useAuth();

  const getUserIdFromLocalStorage = () => {
    return localStorage.getItem("userId");
  };

  console.log(getUserIdFromLocalStorage());

  const handleSave = (e) => {
    e.preventDefault();
    if (getUserIdFromLocalStorage() == null) {
      alert("You need login to comment");
    } else {
      axios
        .post("http://localhost:9999/comments", {
          user_id: userId,
          blog_id: parseInt(id),
          content: comment,
        })
        .then((response) => {
          console.log("New comment created:", response.data);
          setComment("");
          fetchComments();
        })
        .catch((error) => {
          console.error("There was a problem with the axios operation:", error);
        });
    }
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      axios
        .delete(`http://localhost:9999/comments/${commentId}`)
        .then(() => {
          console.log("Comment deleted");
          fetchComments();
        })
        .catch((error) => {
          console.error("There was a problem with the axios operation:", error);
        });
    }
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9999/comments/${editCommentId}`, {
        user_id: userId,
        blog_id: parseInt(id),
        content: editCommentContent,
      })
      .then(() => {
        console.log("Comment updated");
        setEditCommentId(null);
        setEditCommentContent("");
        fetchComments();
      })
      .catch((error) => {
        console.error("There was a problem with the axios operation:", error);
      });
  };

  const fetchComments = () => {
    axios
      .get(`http://localhost:9999/comments/?blog_id=${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSave} className="my-3">
        <Form.Group className="mb-3" controlId="formBasicComment">
          <Form.Control
            type="text"
            placeholder="Comment here......"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </Form.Group>
      </Form>

      <ul className="comment-list" style={{ color: "white" }}>
        {comments.map((comment) => {
          const user = users.find((user) => user.id === comment.user_id);
          const isUserComment = userId === comment.user_id;

          return (
            <li className="comment-item" key={comment.id}>
              <img src="../images/defaultuser.png" alt="avatar" />
              <div className="comment-infor">
                <p style={{ color: "aqua" }}>
                  {user ? user.name : "Unknown User"}
                </p>
                {editCommentId === comment.id ? (
                  <Form onSubmit={handleUpdate}>
                    <Form.Group controlId="formEditComment">
                      <Form.Control
                        type="text"
                        value={editCommentContent}
                        onChange={(e) => setEditCommentContent(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit">Save</Button>
                    <Button onClick={() => setEditCommentId(null)}>
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <p>{comment.content}</p>
                )}
                {isUserComment && (
                  <>
                    <Row>
                      <Col>
                        <Link
                          style={{ marginRight: "10px" }}
                          onClick={() => handleEdit(comment)}
                        >
                          Edit
                        </Link>
                        <Link onClick={() => handleDelete(comment.id)}>
                          Delete
                        </Link>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Comment;
