import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Loader, Message, Pagination, Product } from '../../components';
import ProductCarousel from '../../components/ProductCarousel';
import {
  useGetProductsQuery,
  useGetTopProductsQuery,
} from '../../slices/productsApiSlice';

const Home = () => {
  const { pageNumber, keyword } = useParams();

  const {
    data,
    isLoading,
    error: errorProduct,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const {
    data: topProducts,
    isLoading: isLoadingTop,
    error: topError,
  } = useGetTopProductsQuery();

  const { products, page, pages } = data || {};

  const loading = isLoading || isLoadingTop;
  const error = errorProduct || topError;

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error?.message}</Message>;

  return (
    <>
      {!keyword ? (
        <ProductCarousel topProducts={topProducts} />
      ) : (
        <Link to="/" className="btn btn-light mr-4">
          Go Home
        </Link>
      )}
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
