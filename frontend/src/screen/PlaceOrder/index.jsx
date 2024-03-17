import { useEffect } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CheckoutSteps, Loader, Message } from '../../components';
import { clearCart } from '../../slices/cartSlice';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import CarItem from './CarItem';
import ListGroupItem from './ListGroupItem';

const PlaceOrder = () => {
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
      navigate(`order/${res._id}`);
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
            {/*  */}
            {/* @--> address field */}
            <ListGroupItem title={'Shipping'} strong={'Address'}>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.zipcode}
            </ListGroupItem>
            {/*  */}
            {/* @--> payment field */}
            <ListGroupItem title={'Payment Method'} strong={'Method'}>
              {paymentMethod}
            </ListGroupItem>
            {/* @--> list of items field */}
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((cartItem) => (
                    <CarItem cartItem={cartItem} key={cartItem._id} />
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
              {/* these items are pakced in listgroup.item, si it was seprated */}
              {/* items price with no additinal fees */}
              <ListGroupItem name={'Items'} type={itemsPrice} />
              {/* shipping fees */}
              <ListGroupItem name={'Shiping'} type={shippingPrice} />
              {/* taxes */}
              <ListGroupItem name={'Tax'} type={taxPrice} />
              {/* total price */}
              <ListGroupItem name={'Total'} type={totalPrice} />
              {/* error option */}
              {error && <ListGroupItem error />}
              {/* button  */}
              <ListGroupItem
                button
                disabled={cartItems.length === 0 || isLoading}
                onClick={placeOrderHandler}
              />
              {isLoading && <Loader />}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
