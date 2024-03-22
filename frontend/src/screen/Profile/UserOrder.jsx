import { FaTimes as Cross } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

import { memo } from 'react';
import { Button, Table } from 'react-bootstrap';

const UserOrder = ({ orders }) => {
  return (
    <Table striped hover responsive className="table-sm align-middle">
      <thead>
        <tr>
          <th>ID</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>${order.totalPrice}</td>
            <td>
              {order.isPaid ? (
                order.isPaid.substring(0, 10)
              ) : (
                <Cross style={{ color: 'red' }} />
              )}
            </td>
            <td>
              {order.isDelivered ? (
                order.isDelivered.substring(0, 10)
              ) : (
                <Cross style={{ color: 'red' }} />
              )}
            </td>
            <td>
              <LinkContainer to={`/orders/${order._id}`}>
                <Button className="bnt-sm" variant="light">
                  Details
                </Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default memo(UserOrder);
