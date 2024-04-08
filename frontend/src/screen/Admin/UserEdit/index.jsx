import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormContainer, FormGroup, Loader, Message } from '../../../components';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../../slices/usersApiSlice';

const UserEdit = () => {
  const [data, setData] = useState({
    email: '',
    name: '',
    isAdmin: false,
  });

  const { id: userId } = useParams();

  // @@des --> get data for user
  const {
    data: userData,
    isLoading,
    error: userError,
    refetch,
  } = useGetUserDetailsQuery(userId);

  // @@desc --> update user
  const [updateUser, { isLoading: updatingLoading, error: updateError }] =
    useUpdateUserMutation();

  // @desc --> fill form with user data
  useEffect(() => {
    if (userData) {
      setData({
        email: userData.email,
        name: userData.name,
        isAdmin: userData.isAdmin,
      });
    }
  }, [userData]);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      _id: userId,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
    };

    try {
      await updateUser(updatedUser).unwrap();
      toast.success('User was successfully updated');
      refetch();
      navigate('/admin/users');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const loading = isLoading || updatingLoading;
  const error = userError || updateError;

  return (
    <>
      <Link to="/admin/users">Go Back</Link>
      <FormContainer>
        {loading && <Loader />}
        {error ||
          (updateError && (
            <Message variant="danger">{error || updateError}</Message>
          ))}
        <Form onSubmit={submitHandler}>
          <FormGroup
            controlId="Name"
            placeholder="Enter name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <FormGroup
            controlId="Email"
            placeholder="Enter email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <FormGroup
            type="checkbox"
            controlId="isAdmin"
            label="Is Admin"
            checked={data.isAdmin}
            onChange={(e) => setData({ ...data, isAdmin: e.target.checked })}
          />
          <Button type="submit" variant="primary" className="my-2">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEdit;
