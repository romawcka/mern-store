import { memo } from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const OrderItem = ({ item }) => {
  const { pathname } = useLocation();
  const placeOrderPage =
    pathname.substr(1) === 'placeorder'
      ? `/products/${item._id}`
      : `/products/${item.product}`;

  return (
    <ListGroup.Item key={item._id}>
      <Row>
        <Col md={1}>
          <Image src={item.image} alt={item.name} fluid rounded />
        </Col>
        <Col>
          <Link to={placeOrderPage} style={{ textDecoration: 'none' }}>
            {item.name}
          </Link>
        </Col>
        <Col md={4}>
          {item.qty} x ${item.price} = ${item.qty * item.price}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default memo(OrderItem);
