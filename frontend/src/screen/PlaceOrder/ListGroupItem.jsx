import { memo } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { Message } from '../../components';

const ListGroupItem = ({
  name,
  type,
  title,
  children,
  strong,
  button,
  disabled,
  onClick,
  error,
}) => {
  return (
    <ListGroup.Item>
      {/* error */}
      {error && <Message variant="danger">{'Something went wrong'}</Message>}
      {/* button */}
      {button && (
        <Button
          type="button"
          className="btn-block"
          disabled={disabled}
          onClick={onClick}
        >
          Place Order
        </Button>
      )}
      {/* block text */}
      {title && (
        <>
          <h2>{title}</h2>
          <strong>{strong}:</strong> {children}
        </>
      )}
      {/* otther block text */}
      {type && (
        <Row>
          <Col>{name}:</Col>
          <Col>${type}</Col>
        </Row>
      )}
    </ListGroup.Item>
  );
};

export default memo(ListGroupItem);
