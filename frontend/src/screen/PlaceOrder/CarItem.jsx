import { memo } from 'react';
import { Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CarItem = ({ cartItem }) => {
  return (
    <ListGroup.Item key={cartItem._id}>
      <Row>
        <Col md={1}>
          <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
        </Col>
        <Col>
          <Link
            to={`/products/${cartItem._id}`}
            style={{ textDecoration: 'none' }}
          >
            {cartItem.name}
          </Link>
        </Col>
        <Col md={4}>
          {cartItem.qty} * ${cartItem.price} = ${cartItem.qty * cartItem.price}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default memo(CarItem);
