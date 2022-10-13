import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar( {user} ) {
  function handleSignOut(e) {
    e.preventDefault()

    fetch('/signout', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(response => response.json())
    .then(data => {
      document.location.assign("/sign-in")
    })
    .catch((error) => {
      console.error(error)
      document.location.assign("/sign-in")
    })
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">✉️ Family Spam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/frequently-asked-questions">FAQs</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item target="_blank" href="mailto:kevinebaugh+family-spam@gmail.com?subject=Question%20about%20Family%20Spam">
                Email us
              </NavDropdown.Item>
              {user && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={handleSignOut} title={`Signed in as ${user["email_address"]}`}>
                    Sign out
                  </NavDropdown.Item>
                </>
              )
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
