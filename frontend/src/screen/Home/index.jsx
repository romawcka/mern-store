import { Col, Row } from 'react-bootstrap';
import { Loader, Message, Product } from '../../components';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.message}</Message>;

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
