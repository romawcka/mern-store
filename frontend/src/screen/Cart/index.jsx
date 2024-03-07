import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Message, QtyForm } from '../../components';
import { FaTrash as TrahsIcon } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const itemsCalculation = (items, price = false) => {
  if (price) {
    return items
      .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
      .toFixed(2);
  } else {
    return items.reduce((acc, curr) => acc + curr.qty, 0);
  }
};

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCartHandler = async (product, qty) => {
    await dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    await dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('login?redirect=/shipping');
  };

  return (
    <Row>
      {/* @desc --> the right part of cart */}
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link to="/" style={{ textDecoration: 'none' }}>
              Go back
            </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  {/**/}
                  {/* @desc --> product image */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  {/* @desc --> link for product page */}
                  <Col md={3}>
                    <Link to={`/product/${item._id}`} replace={true}>
                      {item.name}
                    </Link>
                  </Col>

                  {/* @desc --> product price */}
                  <Col md={2}>${item.price}</Col>

                  {/* @desc --> product qty changer */}
                  <Col md={2}>
                    <QtyForm
                      value={item.qty}
                      length={item.countInStock}
                      setValue={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    />
                  </Col>

                  {/* @desc --> delete product */}
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <TrahsIcon />
                    </Button>
                  </Col>

                  {/**/}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      {/* @desc --> left part of cart */}
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            {/* @desc --> part with qty and price */}
            <ListGroup.Item>
              <h2>SubTotal ({itemsCalculation(cartItems)}) items</h2>$
              {itemsCalculation(cartItems, true)}
            </ListGroup.Item>
            {/* @desc --> left part of cart */}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Procced to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
