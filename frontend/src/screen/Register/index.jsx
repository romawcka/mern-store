import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FormContainer, Loader } from '../../components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success(`${name} account was successfully register`);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        {/* */}
        {/* name input */}
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* */}
        {/* email input */}
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* */}
        {/* password input */}

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

          {/* */}
          {/* confirme password input */}
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* button */}
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="mt-3"
            >
              Register
            </Button>
          )}
        </Form.Group>
      </Form>

      <Row className="py-3">
        <Col>
          Alredy have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Log in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
