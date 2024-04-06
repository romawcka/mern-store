import { Col, Row } from 'react-bootstrap';
import { Loader, Message, Pagination, Product } from '../../components';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const { products, page, pages } = data || {};

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
      <Pagination pages={pages} page={page} keyword={keyword} />
    </>
  );
};

export default Home;
