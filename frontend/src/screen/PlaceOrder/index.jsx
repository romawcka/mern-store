import { useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  CheckoutSteps,
  ComponentWithStrong,
  ListGroupItem,
  Loader,
  Message,
  OrderItem,
} from '../../components';
import { clearCart } from '../../slices/cartSlice';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';

const PlaceOrder = () => {
  console.log(useLocation());
  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart;

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shippingAddress.address) navigate('/shipping');
    if (!paymentMethod) navigate('payment');
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCart());
      navigate(`/orders/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <ComponentWithStrong name={'Address'} pos={shippingAddress} />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <ComponentWithStrong name={'Method'} value={cart.paymentMethod} />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <OrderItem item={item} key={item._id} />
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <ListGroupItem title={'Items'} type={cart.itemsPrice} />
                <ListGroupItem title={'Shipping'} type={cart.shippingPrice} />
                <ListGroupItem title={'Tax'} type={cart.taxPrice} />
                <ListGroupItem title={'Total'} type={cart.totalPrice} />
              </ListGroup.Item>

              <ListGroup.Item>
                {error && (
                  <Message variant="danger">{error.data.message}</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
