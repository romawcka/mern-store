import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart as ShoppingCart, FaUser as User } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Store Logo" />
            MyShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <ShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <User /> Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
