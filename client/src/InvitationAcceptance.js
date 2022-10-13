import React, { useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';

function InvitationAcceptance( {code} ) {
  const [codeStatus, setCodeStatus] = useState("pending")

  useEffect(() => {
    setTimeout(() => {
      fetch("/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: code,
        }),
      })
      .then(response => {
        if (response.ok) {
          setCodeStatus("good")
        } else {
          setCodeStatus("bad")
        }
        response.json()
      })
      .then(data => {
        // All good 👍
      })
    }, "2000")
  }, [code]);

  if (codeStatus === "good") {
    return (
      <>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Alert variant="success">
            <Alert.Heading>
              ✅
            </Alert.Heading>
            <h4>
              Invitation accepted successfully.
            </h4>
            <p>
              Check your email for further information.
            </p>
          </Alert>
        </Stack>
      </>
    )
  } else if (codeStatus === "pending") {
    return (
      <>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Alert variant="warning">
            <Alert.Heading>
              <Spinner animation="border" variant="secondary" />
            </Alert.Heading>
            <h4>
              Stand by while we verify your invitation.
            </h4>
            <p>
              The system is checking to make sure your invitation hasn't expired.
              If you end up waiting here for a while, ask for another invitation.
            </p>
          </Alert>
        </Stack>
      </>
    )
  } else if (codeStatus === "bad") {
    return (
      <>
        <Stack gap={2} className="col-md-5 mx-auto">
          <Alert variant="danger">
            <Alert.Heading>
              ❌
            </Alert.Heading>
            <h4>
              There was an error with your invitation.
            </h4>
            <p>
              Your invitation may have expired or it was already accepted.
              Reply to your invitation email and ask for a new invitation.
            </p>
          </Alert>
        </Stack>
      </>
    )
  } else {
    return (
      <h1>None</h1>
    )
  }

}

export default InvitationAcceptance;
