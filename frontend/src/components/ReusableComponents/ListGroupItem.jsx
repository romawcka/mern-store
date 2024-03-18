import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';

const ListGroupItem = ({ title, type }) => {
  return (
    <Row>
      <Col>{title}:</Col>
      <Col>${type}</Col>
    </Row>
  );
};

export default memo(ListGroupItem);
