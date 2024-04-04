import { memo } from 'react';
import { Form } from 'react-bootstrap';

const FormGroup = (props) => {
  const {
    label,
    controlId,
    value,
    checked,
    onChange,
    placeholder,
    type = 'text',
  } = props;
  return (
    <Form.Group controlId={controlId} className="my-2">
      {type === 'checkbox' ? (
        <>
          <Form.Check
            type={type}
            checked={checked}
            onChange={onChange}
            label={label}
          ></Form.Check>
        </>
      ) : (
        <>
          <Form.Label>{label}</Form.Label>
          <Form.Control
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          ></Form.Control>
        </>
      )}
    </Form.Group>
  );
};

export default memo(FormGroup);
