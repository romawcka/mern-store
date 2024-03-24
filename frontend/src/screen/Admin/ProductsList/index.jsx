import { useGetProductsQuery } from '../../../slices/productsApiSlice';
import { Button, Col, Row } from 'react-bootstrap';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { CustomizedTable, Loader, Message } from '../../../components';

const ProductsList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const handleDelete = (id) => console.log(`delete ${id}`);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3">
            <EditIcon /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      <>
        <CustomizedTable
          datum={products}
          type="product"
          handleDelete={handleDelete}
        />
      </>
    </>
  );
};

export default ProductsList;
