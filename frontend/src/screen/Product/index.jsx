import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Loader, Message, Rating } from '../../components';
import { useGetProductDetailQuery } from '../../slices/productsApiSlice';

const Product = () => {
  const { id: productId } = useParams();
  const {
    data: currentProduct = {},
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);
  const { image, name, rating, numReviews, price, description, countInStock } =
    currentProduct;

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>

      {/* @desc --> check for loading and error */}
      {isLoading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}

      <Row>
        {/* first column */}
        <Col md={5}>
          <Image src={image} alt={name} fluid />
        </Col>
        {/* second column */}
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={rating} qnt={numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${price}</ListGroup.Item>
            <ListGroup.Item>Price: {description}</ListGroup.Item>
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
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* status */}
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {countInStock > 0 ? 'In-Stock' : 'Out-of-Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* button */}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!countInStock}
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
