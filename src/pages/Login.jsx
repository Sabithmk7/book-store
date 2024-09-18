import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleData(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await firebase.login(formData.email, formData.password);
  }

  function googleSignin() {
    firebase.signiWithGoogle();
  }

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase]);
  return (
    <div className="container">
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleData}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleData}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>

        <h1 className="mt-5 mb-5">OR</h1>
        <Button onClick={googleSignin} variant="danger">
          Sign in with Google
        </Button>
      </Form>
    </div>
  );
}

export default Login;
