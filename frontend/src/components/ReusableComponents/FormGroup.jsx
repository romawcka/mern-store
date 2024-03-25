import { memo } from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = (props) => {
  const { label, type = 'text', value, onChange, placeholder } = props;
  return (
    <Form.Group controlId={label} className="my-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></Form.Control>
    </Form.Group>
  );
};

export default memo(FormGroup);
