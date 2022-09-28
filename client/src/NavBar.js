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
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
        window.location.reload(false);
      })}

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">✉️ Family Spam</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/faqs">FAQs</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">FAQs</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Terms and conditions
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Contact us</NavDropdown.Item>
              {user && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={handleSignOut}>
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