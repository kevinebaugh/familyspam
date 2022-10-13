import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import  { Redirect } from 'react-router-dom'

function SignInUp( {user, setUser} ) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [signingUp, setSigningUp] = useState(false)

  const [showToast, setShowToast] = useState(false)
  const [toastBody, setToastBody] = useState("")

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
        if (!!data.errors?.length) {
          if (password !== passwordConfirmation) {
            setToastBody(
              "There was an error when signing up. Make sure your password matches your password confirmation."
            )
          } else {
            setToastBody("There was an error when signing up.")
          }
          setShowToast(true)
        } else {
          setUser(data)
        }
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
      if (!!data.errors.length) {
          setToastBody("There was an error when signing in.")
          setShowToast(true)
        } else {
          setUser(data)
        }
      })
  }

  if (user) {
    console.log("Signed in, redirecting")
    return <Redirect to='/group-management'  />
  }

  if (signingUp === true) {
    return (
      <>
        <ToastContainer position="top-end" className="p-3">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={5000}
            autohide
            bg={"danger"}
          >
            <Toast.Header>
              <strong className="me-auto">FamilySpam 🤖</strong>
            </Toast.Header>
            <Toast.Body className={"text-white"}>
              {toastBody}
            </Toast.Body>
          </Toast>
        </ToastContainer>
        <Stack gap={2} className="col-md-5 mx-auto">
          <h3>Sign up for a new account:</h3>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmailAddress(e.target.value)}
                autofocus
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
            <Button
              variant="outline-primary"
              type="submit"
              disabled={
                emailAddress === "" || password === "" || passwordConfirmation === ""
              }
            >
              Sign up
            </Button>
          </Form>
          <hr/>
          <h4>Already have an account? <Button variant="outline-secondary" onClick={toggleSignUpIn}>Sign in</Button></h4>
        </Stack>
      </>
    )
  } else {
    return (
      <>
        <ToastContainer position="top-end" className="p-3">
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={5000}
              autohide
              bg={"danger"}
            >
              <Toast.Header>
                <strong className="me-auto">FamilySpam 🤖</strong>
              </Toast.Header>
              <Toast.Body className={"text-white"}>
                {toastBody}
              </Toast.Body>
            </Toast>
          </ToastContainer>
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="outline-primary"
              type="submit"
              disabled={
                emailAddress === "" || password === ""
              }
            >
              Sign in
            </Button>
          </Form>
          <hr/>
          <h4>Haven't signed up yet? <Button variant="outline-secondary" onClick={toggleSignUpIn}>Sign up</Button></h4>
        </Stack>
      </>
    )
  }
}

export default SignInUp;
