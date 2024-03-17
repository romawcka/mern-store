import { useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader, Message, QtyForm, Rating } from '../../components';
import { addToCart } from '../../slices/cartSlice';
import { useGetProductDetailQuery } from '../../slices/productsApiSlice';

const Product = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: currentProduct = {},
    isLoading,
    error,
  } = useGetProductDetailQuery(productId);

  const { image, name, rating, numReviews, price, description, countInStock } =
    currentProduct;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...currentProduct,
        qty,
      }),
    );
    navigate('/cart');
  };

  const moveBack = () => navigate(-1);

  return (
    <>
      <Link className="btn btn-light my-3" onClick={moveBack}>
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

              {/* qty */}
              {!!countInStock && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <QtyForm
                        value={qty}
                        length={countInStock}
                        setValue={(e) => setQty(Number(e.target.value))}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              {/* button */}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={!countInStock}
                  onClick={handleAddToCart}
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
