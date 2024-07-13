import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Button, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Addtoteam = () => {
  const [service, setService] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/attendees")
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:9999/workshops`)
      .then((response) => {
        setWorkshops(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workshops:", error);
      });
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    setService((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, quantity: newQuantity } : vehicle
      )
    );
  };
  const getWorkshopTitle = (workshopId) => {
    const workshop = workshops.find((ws) => ws.id === parseInt(workshopId));
    return workshop ? workshop.title : "Unknown";
  };
  return (
    <>
      <Header />
      <Container>
        <Row className="my-4">
          <h2>Team Members</h2>
        </Row>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              <th style={{ backgroundColor: "black", color: "white" }}>Id</th>
              <th style={{ backgroundColor: "black", color: "white" }}>Name</th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Workshop
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Status
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Quantity
              </th>
              <th style={{ backgroundColor: "black", color: "white" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {service.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.id}</td>
                <td>{vehicle.name}</td>
                <td>{getWorkshopTitle(vehicle.workshopId)}</td>
                <td>{vehicle.status}</td>
                <td>
                  <input
                    type="number"
                    value={vehicle.quantity || ""}
                    onChange={(e) =>
                      handleQuantityChange(vehicle.id, e.target.value)
                    }
                  />
                </td>
                <td>
                  <Button className="btn btn-info">
                    <Link
                      style={{ textDecoration: "none" }}
                      className="text-light"
                      to={`/attendees/${vehicle.id}`}
                    >
                      Add
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Addtoteam;
