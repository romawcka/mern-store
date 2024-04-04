import { memo } from 'react';
import { Button, Table as TableBootstrap } from 'react-bootstrap';
import {
  FaTimes as CrossIcon,
  FaCheck as CheckedIcon,
  FaEdit as EditIcon,
  FaTrash as TrashIcon,
} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const CustomizedTable = ({ datum, type = 'order', handleDelete }) => {
  return (
    <TableBootstrap striped hover responsive className="table-sm align-middle">
      <thead>
        <tr>
          {type === 'product' ? (
            <>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </>
          ) : type === 'users' ? (
            <>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>ADMIN</th>
              <th></th>
            </>
          ) : (
            <>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {datum?.map((data) => (
          <tr key={data._id}>
            <td>{data._id}</td>
            {/* -- differences between two types */}
            {/* @@ table for products */}

            {type === 'product' ? (
              <>
                <td>{data.name}</td>
                <td>${data.price}</td>
                <td>{data.category}</td>
                <td>{data.brand}</td>
                <td>
                  <LinkContainer to={`/admin/products/${data._id}/edit`}>
                    <Button variant="info" className="btn-sm mx-2">
                      <EditIcon />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(data._id)}
                  >
                    <TrashIcon style={{ color: '#e2d6d6' }} />
                  </Button>
                </td>
              </>
            ) : type === 'users' ? (
              <>
                {/* @@ table for users */}
                <td>{data.name}</td>
                <td>
                  <a href={`mailto:${data.email}`}>{data.email}</a>
                </td>
                <td>
                  {data.isAdmin ? (
                    <CheckedIcon style={{ color: 'green' }} />
                  ) : (
                    <CrossIcon style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${data._id}/edit`}>
                    <Button className="bnt-sm" variant="light">
                      <EditIcon />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(data._id)}
                  >
                    <TrashIcon style={{ color: 'white' }} />
                  </Button>
                </td>
              </>
            ) : (
              <>
                {/* @@ table for orders */}
                <td>{data.createdAt.substring(0, 10)}</td>
                <td>${data.totalPrice}</td>
                <td>
                  {data.isPaid ? (
                    data.paidAt?.substring(0, 10)
                  ) : (
                    <CrossIcon style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {data.isDelivered ? (
                    data.deliveredAt.substring(0, 10)
                  ) : (
                    <CrossIcon style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${data._id}`}>
                    <Button className="bnt-sm" variant="info">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </TableBootstrap>
  );
};

export default memo(CustomizedTable);
