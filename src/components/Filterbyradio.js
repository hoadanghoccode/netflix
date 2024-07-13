import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const Filterbyradio = ({ query }) => {
  const [user, setUser] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onchange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedItems(() => [value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
  };

  useEffect(() => {
    const sql =
      selectedItems.length > 0
        ? selectedItems.map((item) => `author_id=${item}`).join("&")
        : "";
    query(sql);
  }, [selectedItems, query]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/users/?role=author")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(selectedItems);

  return (
    <>
      <Form>
        {user.map((data, index) => (
          <div key={index}>
            <input
              type="radio"
              onChange={onchange}
              id={`department-${index}`}
              name="department"
              value={data.id}
            />
            <label htmlFor={`department-${index}`}>{data.name}</label>
          </div>
        ))}
      </Form>
    </>
  );
};

export default Filterbyradio;
