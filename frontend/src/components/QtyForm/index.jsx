import { memo } from 'react';
import { Form } from 'react-bootstrap';

const QtyForm = ({ setValue, value, length }) => {
  return (
    <Form.Control as="select" value={value} onChange={setValue}>
      {[
        Array.from({ length }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        )),
      ]}
    </Form.Control>
  );
};

export default memo(QtyForm);
