import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function SignInUp() {
  const [email_address, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  function handleSignup(e) {
    e.preventDefault()
    console.log("email_address", email_address)
    console.log("password", password)
    console.log("password_confirmation", password_confirmation)

    fetch("/group_admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email_address,
        password: password,
        password_confirmation: password_confirmation,
      }),
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Password confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password confirmation"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </Stack>
  );
}

export default SignInUp;
