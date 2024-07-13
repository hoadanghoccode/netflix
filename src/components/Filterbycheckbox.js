import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const Filterbycheckbox = ({ query }) => {
  const [tag, setTag] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onchange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
  };

  

  useEffect(() => {
    const sql =
      selectedItems.length > 0
        ? selectedItems.map((item) => `tag_like=${item}`).join("&")
        : "";
    query(sql);
  }, [selectedItems, query]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/tag")
      .then((response) => {
        setTag(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Form>
        {tag.map((data, index) => (
          <div key={index}>
            <input
              type="checkbox"
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

export default Filterbycheckbox;
