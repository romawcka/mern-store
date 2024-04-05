import { memo } from 'react';
import { Button, Form } from 'react-bootstrap';

const ReviewInput = ({
  rating,
  comment,
  onSubmit,
  disabled,
  handleRate,
  handleComment,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="ratings" className="my-2">
        <Form.Label>Ratings</Form.Label>
        <Form.Control as="select" value={rating} onChange={handleRate}>
          <option value="">Select</option>
          <option value="1">1 - Poor</option>
          <option value="2">2 - Fair</option>
          <option value="3">3 - Good</option>
          <option value="4">4 - Very Good</option>
          <option value="5">5 - Excellent</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="comment" className="my-2">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          value={comment}
          onChange={handleComment}
        ></Form.Control>
      </Form.Group>
      <Button disabled={disabled} type="submit" variant="primary">
        Post a Review
      </Button>
    </Form>
  );
};

export default memo(ReviewInput);
