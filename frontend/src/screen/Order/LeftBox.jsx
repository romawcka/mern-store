import { memo } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { ComponentWithStrong, Message, OrderItem } from '../../components';

const LeftBox = ({ orderData }) => {
  const {
    user,
    shippingAddress,
    isDelivered,
    paymentMethod,
    isPaid,
    orderItems: orders,
  } = orderData || {};

  return (
    <Col md={8}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Shipping</h2>

          <ComponentWithStrong name={'Name'} value={user?.name} />
          <ComponentWithStrong name={'Email'} value={user?.email} />
          <ComponentWithStrong name={'Address'} pos={shippingAddress} />

          {isDelivered ? (
            <Message variant="success">
              Delivered on {orderData.deliveredAt}
            </Message>
          ) : (
            <Message variant="danger">Not Delivered</Message>
          )}
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Payment Method</h2>

          <ComponentWithStrong name={'Method'} value={paymentMethod} />

          {isPaid ? (
            <Message variant="success">Paid on {orderData.paidAt}</Message>
          ) : (
            <Message variant="danger">Not Paid</Message>
          )}
        </ListGroup.Item>

        <ListGroup.Item>
          <h2>Order Items</h2>
          {orders.map((order) => (
            <OrderItem item={order} key={order._id} />
          ))}
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
};

export default memo(LeftBox);
