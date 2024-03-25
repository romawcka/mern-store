import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CustomizedTable, FormGroup, Loader, Message } from '../../components';
import { setCredentials } from '../../slices/authSlice';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { useProfileMutation } from '../../slices/usersApiSlice';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();
  const {
    data: orders,
    isLoading: isLoadingOrders,
    error,
    refetch,
  } = useGetMyOrdersQuery();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password did not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        refetch();
        toast.success('Profile was successfully updated');
      } catch (error) {
        toast.error(error?.data?.message || 'Profile could be updated');
      }
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name);
      setEmail(userInfo?.email);
    }
  }, [userInfo]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <FormGroup
            label="Name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormGroup
            label={'Email'}
            type={'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup
            label={'Password'}
            type={'password'}
            value={password}
            otherI
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormGroup
            label={'Confirm Password'}
            type={'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            className="my-2"
            disabled={isLoading}
          >
            Submit
          </Button>

          {isLoading || (isLoadingOrders && <Loader />)}
        </Form>
      </Col>
      <Col md={9}>
        {!userInfo.isAdmin && (
          <>
            <h2>My Orders</h2>
            {error && (
              <Message variant="danger">{error?.data?.message}</Message>
            )}
            {isLoading || (isLoadingOrders && <Loader />)}
            <CustomizedTable datum={orders} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
