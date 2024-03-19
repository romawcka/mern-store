import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader, Message } from '../../components';
import { useGetOrderDetailQuery } from '../../slices/ordersApiSlice';
import LeftBox from './LeftBox';
import RigthBox from './RigthBox';

const Order = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { id: orderId } = useParams();
  const {
    data: orderData,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailQuery(orderId);

  if (isLoading) return <Loader />;
  if (error) return <Message>{error?.message}</Message>;

  return (
    <>
      <h1>Order: {orderData?._id}</h1>
      <Row>
        <LeftBox orderData={orderData} />
        <RigthBox orderData={orderData} refetch={refetch} orderId={orderId} />
      </Row>
    </>
  );
};

export default Order;
