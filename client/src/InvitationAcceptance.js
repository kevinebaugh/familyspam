import React, { useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';

function InvitationAcceptance( {code} ) {
  const [codeStatus, setCodeStatus] = useState("pending")

  useEffect(() => {
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
        console.log("Code is good!")
        setCodeStatus("good")
      } else {
        console.log("Code is bad!")
        setCodeStatus("bad")
      }
      response.json()
    })
    .then(data => {
      console.log("data", data)
    })
  }, []);

  if (codeStatus === "good") {
    return (
      <h1>Code is good</h1>
    )
  } else if (codeStatus === "pending") {
    return (
      <h1>Code is pending</h1>
    )
  } else if (codeStatus === "bad") {
    return (
      <h1>Code is bad</h1>
    )
  } else {
    return (
      <h1>None</h1>
    )
  }

}

export default InvitationAcceptance;
