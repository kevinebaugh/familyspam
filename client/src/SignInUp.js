import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import  { Redirect } from 'react-router-dom'

function SignInUp( {user, setUser} ) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [signingUp, setSigningUp] = useState(true)

  function toggleSignUpIn() {
    setSigningUp(!signingUp)
  }

  function handleSignup(e) {
    e.preventDefault()

    fetch("/group_admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: emailAddress,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    }).then(response => response.json())
      .then(data => {
        setUser(data)
      })
  }

  function handleSignin(e) {
    e.preventDefault()

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: emailAddress,
        password: password
      }),
    }).then(response => response.json())
      .then(data => {
        setUser(data)
      })
  }

  if (user) {
    console.log("Signed in, redirecting")
    return <Redirect to='/group-management'  />
  }

  if (signingUp === true) {
    return (
      <Stack gap={2} className="col-md-5 mx-auto">
        <h3>Sign up for a new account:</h3>
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
          <Button variant="outline-primary" type="submit">
            Sign up
          </Button>
        </Form>
        <hr/>
        <h4>Already have an account? <Button variant="outline-secondary" onClick={toggleSignUpIn}>Sign in</Button></h4>
      </Stack>
    )
  } else {
    return (
      <Stack gap={2} className="col-md-5 mx-auto">
        <h3>Sign in to your account:</h3>
        <Form onSubmit={handleSignin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll still never share your email with anyone else.
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
          <Button variant="outline-primary" type="submit">
            Sign in
          </Button>
        </Form>
        <hr/>
        <h4>Haven't signed up yet? <Button variant="outline-secondary" onClick={toggleSignUpIn}>Sign up</Button></h4>
      </Stack>
    )
  }
}

export default SignInUp;
