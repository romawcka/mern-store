import { toast } from 'react-toastify';
import { CustomizedTable, Loader, Message } from '../../../components';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../slices/usersApiSlice';

const UserList = () => {
  const {
    data: users,
    isLoading,
    error: usersError,
    refetch,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: isDeleting, error: deleteError }] =
    useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Would you like to delete user?'))
      try {
        await deleteUser(id);
        toast.success('User was successfully deleted');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
  };

  const loading = isDeleting || isLoading;
  const error = usersError || deleteError;

  return (
    <>
      <h1>Users</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      <CustomizedTable datum={users} type="users" handleDelete={handleDelete} />
    </>
  );
};

export default UserList;
