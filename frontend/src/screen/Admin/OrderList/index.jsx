import { useParams } from 'react-router-dom';
import {
  CustomizedTable,
  Loader,
  Message,
  Pagination,
} from '../../../components';
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice';

const OrderList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  const { orders, page, pages } = data || {};

  return (
    <>
      <h1>Orders</h1>
      {isLoading && <Loader />}
      {error && <Message>{error}</Message>}
      <CustomizedTable datum={orders} />
      <Pagination page={page} pages={pages} isAdmin adminPath="orders" />
    </>
  );
};

export default OrderList;
