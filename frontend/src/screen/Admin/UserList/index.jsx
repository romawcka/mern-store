import { CustomizedTable, Loader, Message } from '../../../components';
import { useGetUsersQuery } from '../../../slices/usersApiSlice';

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const handleDelete = (id) => console.log(`delete ${id}`);

  return (
    <>
      <h1>Users</h1>
      {isLoading && <Loader />}
      {error && <Message>{error}</Message>}
      <CustomizedTable datum={users} type="users" handleDelete={handleDelete} />
    </>
  );
};

export default UserList;
