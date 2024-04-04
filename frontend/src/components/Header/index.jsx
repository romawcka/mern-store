import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart as ShoppingCart, FaUser as User } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logo.png';
import { logout } from '../../slices/authSlice';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import DropDown from '../ReusableComponents/DropDown';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const itemsQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await Logout().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
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
                <DropDown
                  path="/profile"
                  id="username"
                  title={userInfo.name}
                  name={userInfo.name}
                  onClick={handleLogout}
                />
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <User /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* for admin only */}
              {userInfo && userInfo.isAdmin && (
                <DropDown
                  title="Admin Panel"
                  name="Orders"
                  id="adminuser"
                  path="/admin/orders"
                  pathSecond="/admin/users"
                  nameSecond="Users"
                  pathThird="/admin/products"
                  nameThird="Products"
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
