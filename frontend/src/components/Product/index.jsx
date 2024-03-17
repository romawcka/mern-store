import { memo } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating';

const Product = ({ product }) => {
  const { _id: id, name, price, image, rating, numReviews } = product;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${id}`}>
        <Card.Img src={image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating value={rating} qnt={numReviews} />
        </Card.Text>
        <Card.Text as="h3">${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default memo(Product);
