import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import InputGroup from 'react-bootstrap/InputGroup';

const surnames = ["Wang","Li","Zhang","Chen","Liu","Devi","Yang","Huang","Singh","Wu","Kumar","Xu","Ali","Zhao","Zhou","Nguyen","Khan","Ma","Lu","Zhu","Maung","Sun","Yu","Lin","Kim","He","Hu","Jiang","Guo","Ahmed","Khatun","Luo","Akter","Gao","Zheng","da","Tang","Liang","Das","Wei","Mohamed","Islam","Shi","Song","Xie","Han","Garcia","Mohammad","Tan","Deng","Bai","Ahmad","Yan","Kaur","Feng","Hernandez","Rodriguez","Cao","Lopez","Hassan","Hussain","Gonzalez","Martinez","Ceng","Ibrahim","Peng","Cai","Xiao","Tran","Pan","dos","Cheng","Yuan","Rahman","Yadav","Su","Perez","I","Le","Fan","Dong","Ye","Ram","Tian","Fu","Hossain","Kumari","Sanchez","Du","Pereira","Yao","Zhong","Jin","Pak","Ding","Mohammed","Lal","Yin","Bibi","Silva"]
const surnameSample = [surnames[Math.floor ( Math.random() * surnames.length )], surnames[Math.floor ( Math.random() * surnames.length )]]

function GroupManagement( {user} ) {
  const [showToast, setShowToast] = useState(false)
  const [toastBody, setToastBody] = useState("")
  const [invitedEmailAddress, setInvitedEmailAddress] = useState("");
  const [groupName, setGroupName] = useState(user.group.name)
  const [newGroupName, setNewGroupName] = useState("");
  const [emailAlias, setEmailAlias] = useState(user.group.email_alias)
  const [newEmailAlias, setNewEmailAlias] = useState("");

  function handleInvite(e) {
    e.preventDefault()

    setToastBody(`${invitedEmailAddress} has been invited to your group.
      They will have 24 hours to accept the invitation.`)

    fetch("/group_invitations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: invitedEmailAddress,
      }),
    }).then(response => response.json())
    .then(data => {
      setInvitedEmailAddress("")
      setShowToast(true)
      })
  }

  function handleGroupNameUpdate(e) {
    e.preventDefault()

    setToastBody(`Your new group name is ${newGroupName}.`)

    fetch(`/groups/${user.group.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newGroupName,
      }),
    }).then(response => response.json())
      .then(data => {
        setGroupName(data.name)
        setNewGroupName("")
        setShowToast(true)
      })
  }

  function handleGroupAliasUpdate(e) {
    e.preventDefault()

    setToastBody(`Your new family email alias is ${newEmailAlias}@familyspam.com.`)

    fetch(`/groups/${user.group.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_alias: newEmailAlias,
      }),
    }).then(response => response.json())
      .then(data => {
        setEmailAlias(data.email_alias)
        setNewEmailAlias("")
        setShowToast(true)
      })
  }

  function copyAliasToClipboard(e) {
    e.preventDefault()
    const text = `${emailAlias}@familyspam.com`

    if (!navigator.clipboard) {
      setToastBody(`There was an error copying your email alias to your clipboard.`)
      return
    } else {
      setToastBody(`Your email alias (${emailAlias}@familyspam.com)
        has been copied to your clipboard.`)
    }
    navigator.clipboard.writeText(text)
    setShowToast(true)
  }

  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">FamilySpam 🤖</strong>
          </Toast.Header>
          <Toast.Body>
            {toastBody}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Stack gap={2} className="col-md-5 mx-auto">
        <h2>Group management</h2>
        <h3>Group name: {groupName}</h3>
        <h4 style={{ cursor: "pointer" }} onClick={copyAliasToClipboard}>Family email address: <code>{emailAlias}@familyspam.com</code></h4>
        {user.recipients.length > 0 &&
          <>
            <hr/>
            <ListGroup >
              <h4>Active recipients:</h4>
              {user.recipients.map( (recipient) => (
                <ListGroup.Item>• {recipient.email_address}</ListGroup.Item>
                ))}
            </ListGroup>
          </>
        }
        <hr/>
        <Form onSubmit={handleInvite}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><h4>Invite someone to your group:</h4></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={invitedEmailAddress}
              onChange={(e) => setInvitedEmailAddress(e.target.value)}
            />
            <Form.Text className="text-muted">
              They'll have 24 hours to accept the invitation.
              You can always send them another invitation if it expires.
            </Form.Text>
          </Form.Group>

          <Button
            disabled={invitedEmailAddress === ""}
            variant="primary"
            type="submit"
          >
            Invite
          </Button>
        </Form>

        <Form onSubmit={handleGroupNameUpdate}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label><h4>Update your group name:</h4></Form.Label>
            <Form.Control
              type="text"
              placeholder={groupName}
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Form.Text className="text-muted">
              The singular form of your family name
              (ex. {surnameSample[0]} or {surnameSample[1]})
            </Form.Text>
          </Form.Group>

          <Button
            disabled={newGroupName === ""}
            variant="primary"
            type="submit"
          >
            Update
          </Button>
        </Form>

        <Form onSubmit={handleGroupAliasUpdate}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label htmlFor="basic-url"><h4>Update your group alias:</h4></Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                aria-describedby="basic-addon3"
                type="text"
                placeholder={emailAlias}
                value={newEmailAlias}
                onChange={(e) => setNewEmailAlias(e.target.value)}
              />
              <InputGroup.Text id="basic-addon3">
                @familyspam.com
              </InputGroup.Text>
            <Form.Text className="text-muted">
              The email address where your family will receive emails.
              (ex. {surnameSample[0].toLowerCase()}s@familyspam.com or {surnameSample[1].toLowerCase()}s@familyspam.com)
            </Form.Text>
            </InputGroup>

          </Form.Group>

          <Button
            disabled={newEmailAlias === ""}
            variant="primary"
            type="submit"
          >
            Update
          </Button>
        </Form>
      </Stack>
    </>
  );
}

export default GroupManagement;
