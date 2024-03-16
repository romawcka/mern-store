import { memo } from 'react';
import { Nav } from 'react-bootstrap';
import NavForm from './NavForm';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavForm step={step1} link={'/login'} title={'Sign In'} />
      <NavForm step={step2} link={'/shipping'} title={'Shipping'} />
      <NavForm step={step3} link={'/payment'} title={'Payment'} />
      <NavForm step={step4} link={'/placeorder'} title={'Place Order'} />
    </Nav>
  );
};

export default memo(CheckoutSteps);
