import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import  { Redirect } from 'react-router-dom'
import letter from './letter.gif'

function SignInUp( {user, setUser} ) {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [status, setStatus] = useState("learning")

  const [showToast, setShowToast] = useState(false)
  const [toastBody, setToastBody] = useState("")

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
        if (!!data.error?.length) {
          if (password !== passwordConfirmation) {
            setToastBody(
              "There was an error when signing up. Make sure your password matches your password confirmation."
            )
          } else {
            setToastBody(data.error)
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
      if (!!data.errors?.length) {
          setToastBody("There was an error when signing in.")
          setShowToast(true)
        } else {
          setUser(data)
        }
      })
  }

  function changeStatusTo(e) {
    e.preventDefault()

    setStatus(e.target.id)
  }

  if (user) {
    console.log("Signed in, redirecting")
    return <Redirect to='/group-management'  />
  }

  return (
    <>
      <Stack gap={2} className="col-md-5 mx-auto">
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

        {status === "learning" ? (
          <>
            <img style={{width: "20%"}} src={letter} />
            <h1>Family Spam</h1>
            <h3>Features:</h3>
            <ul>
              <li>One email address that forwards to your whole family.</li>
              <li>Simple group management.</li>
              <li>Straightforward pricing: <s>$10 per 100 emails</s> free for now </li>
            </ul>

            <Button
              size="lg"
              variant="outline-primary"
              type="submit"
              onClick={changeStatusTo}
              id="signingUp"
            >
              Sign up
            </Button>

            <Button
              size="lg"
              variant="outline-secondary"
              type="submit"
              onClick={changeStatusTo}
              id="signingIn"
            >
              Sign in
            </Button>
          </>
        ) : null }

        {status === "signingUp" ? (
          <>
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
                size="lg"
                variant="outline-primary"
                type="submit"
                disabled={
                  emailAddress === "" || password === "" || passwordConfirmation === ""
                }
              >
                Sign up
              </Button>{" "}
              <span> or <a onClick={changeStatusTo} id="signingIn" href="#">sign in</a></span>
            </Form>
          </>
        ) : null }

        {status === "signingIn" ? (
          <>
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
                size="lg"
                variant="outline-primary"
                type="submit"
                disabled={
                  emailAddress === "" || password === ""
                }
              >
                Sign in
              </Button>

              <span> or <a onClick={changeStatusTo} id="learning" href="#">learn more</a> before <a onClick={changeStatusTo} id="signingUp" href="#">signing up</a></span>
            </Form>
          </>
        ) : null }
      </Stack>
    </>
  )
}

export default SignInUp;
