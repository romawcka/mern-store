import { Button, Col, Row } from 'react-bootstrap';
import { FaEdit as EditIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CustomizedTable, Loader, Message } from '../../../components';
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../../slices/productsApiSlice';

const ProductsList = () => {
  // @desc -> general data for products
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  // @desc -> fn for creating product
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  // @desc -> fn for deleting product
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Would you like to create a new product')) {
      try {
        await createProduct();
        refetch();
        toast.success('The product was successfully created');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Would you like to delete product?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('The product was successfully deleted');
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const loading = isLoading || isCreating || isDeleting;

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
