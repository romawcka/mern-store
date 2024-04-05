import { memo } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Rating } from '../../../components';

const ReviewTable = ({ review }) => {
  return (
    <ListGroup.Item>
      <strong>{review.name}</strong>
      <Rating value={review.rating} />
      <p>{review.createdAt.substring(0, 10)}</p>
      <p>{review.comment}</p>
    </ListGroup.Item>
  );
};

export default memo(ReviewTable);
