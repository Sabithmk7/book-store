import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function Lists() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    price: "",
    coverPic: '',
  });

  function handleData(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name ==="url"? e.target.files[0] : e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await firebase.addBook(formData.name, formData.number,formData.coverPic,formData.price);
  }


  return (
    <div className="container">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleData}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={formData.number}
            placeholder="Number"
            onChange={handleData}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            placeholder="price"
            onChange={handleData}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Enter url</Form.Label>
          <Form.Control
            type="file"
            name="url"
            placeholder="url"
            onChange={handleData}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </div>
  );
}

export default Lists;
