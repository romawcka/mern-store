import { memo } from 'react';
import { Button, Table as TableBootstrap } from 'react-bootstrap';
import { FaTimes as Cross } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Table = ({ datum }) => {
  return (
    <TableBootstrap striped hover responsive className="table-sm align-middle">
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
        {datum?.map((data) => (
          <tr key={data._id}>
            <td>{data._id}</td>
            <td>{data.createdAt.substring(0, 10)}</td>
            <td>${data.totalPrice}</td>
            <td>
              {data.isPaid ? (
                data.paidAt?.substring(0, 10)
              ) : (
                <Cross style={{ color: 'red' }} />
              )}
            </td>
            <td>
              {data.isDelivered ? (
                data.deliveredAt.substring(0, 10)
              ) : (
                <Cross style={{ color: 'red' }} />
              )}
            </td>
            <td>
              <LinkContainer to={`/orders/${data._id}`}>
                <Button className="bnt-sm" variant="info">
                  Details
                </Button>
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </TableBootstrap>
  );
};

export default memo(Table);
