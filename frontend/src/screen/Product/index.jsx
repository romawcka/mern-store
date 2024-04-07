import { useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader, Message, Meta, QtyForm, Rating } from '../../components';
import { addToCart } from '../../slices/cartSlice';
import {
  useCreateReviewMutation,
  useGetProductDetailQuery,
} from '../../slices/productsApiSlice';
import ReviewInput from './Review/ReviewInput';
import ReviewTable from './Review/ReviewTable';
import styles from './index.module.css';

const Product = () => {
  const [qty, setQty] = useState(1);
  const [data, setData] = useState({
    rating: 0,
    comment: '',
  });

  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: currentProduct = {},
    isLoading,
    productError,
    refetch,
  } = useGetProductDetailQuery(productId);

  const {
    image,
    name,
    rating: currentProductRating,
    reviews,
    numReviews,
    price,
    description,
    countInStock,
  } = currentProduct;

  const [createReview, { isLoading: reviewsLoading }] =
    useCreateReviewMutation();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...currentProduct,
        qty,
      }),
    );
    navigate('/cart');
  };

  const handleReviewed = async (e) => {
    e.preventDefault();

    const review = {
      rating: data.rating,
      comment: data.comment,
      _id: productId,
    };

    try {
      await createReview(review).unwrap();
      refetch();
      toast.success('Review added');
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      setData({
        comment: '',
        rating: 0,
      });
    }
  };

  const moveBack = () => navigate(-1);

  const handleRate = (e) => setData({ ...data, rating: +e.target.value });

  const handleComment = (e) => setData({ ...data, comment: e.target.value });

  const loading = isLoading || reviewsLoading;
  const error = productError;

  return (
    <>
      <Link className="btn btn-light my-3" onClick={moveBack}>
        Go back
      </Link>

      {/* @desc --> check for loading and error */}
      {loading && <Loader />}
      {error && <Message variant="danger">{error?.message}</Message>}
      <>
        <Meta title={name} />
        <Row className={styles.row}>
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
                <Rating value={currentProductRating} qnt={numReviews} />
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
        {/* @@desc --> reviews */}
        <Row className="review">
          <Col md={6}>
            <h2>Reviews</h2>
            {!!reviews && <Message>No reviews yet 🥺</Message>}
            <ListGroup variant="flush">
              {/* @@desc --> component to show reviews */}
              {reviews?.map((review) => (
                <ReviewTable review={review} key={review._id} />
              ))}
              <ListGroup.Item>
                {/* @@desc --> component to write a review */}
                <h2>Write a Customer Review</h2>
                {loading && <Loader />}
                {userInfo ? (
                  <ReviewInput
                    disabled={loading}
                    rating={data.rating}
                    comment={data.comment}
                    handleRate={handleRate}
                    onSubmit={handleReviewed}
                    handleComment={handleComment}
                  />
                ) : (
                  <Message>
                    Please <Link to="/login">sing in</Link> to write a review
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </>
    </>
  );
};

export default Product;
