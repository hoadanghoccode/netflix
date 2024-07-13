import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import AdminDashboard from "./AdminDashboard";
import Homepage from "./Homepage";
import { useNavigate } from "react-router-dom";

const Management = () => {
  const { role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to different routes based on user role
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "user":
        navigate("/");
        break;
      default:
        navigate("/error"); // Navigate to an error page or default route
    }
  }, [role, navigate]);

  // Render nothing directly in the component
  return null;
};

export default Management;
