import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart as ShoppingCart, FaUser as User } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const itemsQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Store Logo" />
              MyShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <ShoppingCart /> Cart
                  {!!itemsQty && (
                    <Badge pill bg="info" style={{ marginLeft: '5px' }}>
                      {itemsQty}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <User /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
