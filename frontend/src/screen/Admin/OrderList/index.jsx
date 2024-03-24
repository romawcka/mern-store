import { Loader, Message, Table } from '../../../components';
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1>Orders</h1>
      {isLoading && <Loader />}
      {error && <Message>{error}</Message>}
      <Table datum={orders} />
    </>
  );
};

export default OrderList;
