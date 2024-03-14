import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaShoppingCart as ShoppingCart, FaUser as User } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.png';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const itemsQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);

  const handleLogout = () => {
    console.log('logout');
  };

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
                  {/* badge to show the qty */}
                  {!!itemsQty && (
                    <Badge pill bg="info" style={{ marginLeft: '5px' }}>
                      {itemsQty}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {/* */}
              {userInfo ? (
                // dropdown menu when user login
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{userInfo.name} profiel</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                //
                <LinkContainer to="/login">
                  <Nav.Link>
                    <User /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
