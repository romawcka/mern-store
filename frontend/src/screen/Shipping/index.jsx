import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckoutSteps, FormContainer } from '../../components';
import { saveShippingAddress } from '../../slices/cartSlice';
import FormComponent from './FormComponent';

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || '',
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={handleSubmit}>
        {/* address form */}
        <FormComponent
          value={address}
          label={'Address'}
          controlId={address}
          onChange={(e) => setAddress(e.target.value)}
          text={'address'}
        />
        {/* city form */}
        <FormComponent
          value={city}
          label={'City'}
          controlId={city}
          onChange={(e) => setCity(e.target.value)}
          text={'city'}
        />
        {/* zipcode form */}
        <FormComponent
          value={postalCode}
          label={'Postal Code'}
          controlId={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          text={'zipcode'}
        />
        {/* country form */}
        <FormComponent
          value={country}
          label={'Country'}
          controlId={country}
          onChange={(e) => setCountry(e.target.value)}
          text={'country'}
        />
        {/* button form */}
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;
