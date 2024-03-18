import { Card, Col, ListGroup } from 'react-bootstrap';
import { ListGroupItem } from '../../components';

const RigthBox = ({ orderData }) => {
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = orderData;
  return (
    <Col md={4}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>Order Summary</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <ListGroupItem type={itemsPrice} title={'Items'} />
            <ListGroupItem type={shippingPrice} title={'Shipping'} />
            <ListGroupItem type={taxPrice} title={'Tax'} />
            <ListGroupItem type={totalPrice} title={'Total'} />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default RigthBox;
