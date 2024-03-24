import { Button, Col, Row } from 'react-bootstrap';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CustomizedTable, Loader, Message } from '../../../components';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../../slices/productsApiSlice';

const ProductsList = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Would you like to create a new product')) {
      try {
        await createProduct();
        refetch();
        toast.success('The product was s uccessfully created');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleDelete = (id) => console.log(`delete ${id}`);

  const loading = isLoading || isCreating;

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            className="btn-sm m-3"
            onClick={createProductHandler}
            disabled={loading}
          >
            <EditIcon /> Create Product
          </Button>
        </Col>
      </Row>

      {loading && <Loader />}
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
