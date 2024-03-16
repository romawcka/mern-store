import { memo } from 'react';
import { Form } from 'react-bootstrap';

const FormComponent = ({
  controlId,
  className = 'my-2',
  label,
  value,
  text,
  onChange,
}) => {
  return (
    <>
      <Form.Group controlId={controlId} className={className}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          value={value}
          placeholder={`Enter your ${text}`}
          onChange={onChange}
        ></Form.Control>
      </Form.Group>
    </>
  );
};

export default memo(FormComponent);
