import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../../products';
import { Rating } from '../../components';

//TODO - add destruture for the future data
const Product = () => {
  const { id: productId } = useParams();
  const currentProduct = products.find((product) => product._id === productId);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      <Row>
        {/* first column */}
        <Col md={5}>
          <Image src={currentProduct.image} alt={currentProduct.name} fluid />
        </Col>
        {/* second column */}
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{currentProduct.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={currentProduct.rating}
                qnt={currentProduct.numReviews}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${currentProduct.price}</ListGroup.Item>
            <ListGroup.Item>Price: {currentProduct.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        {/* third column */}
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              {/* price */}
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${currentProduct.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* status */}
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {currentProduct.countInStock > 0
                        ? 'In-Stock'
                        : 'Out-of-Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* button */}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!currentProduct.countInStock}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Product;
