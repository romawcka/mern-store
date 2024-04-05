import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Pagination = ({ page, pages, isAdmin = false, adminPath }) => {
  if (pages > 1) {
    return (
      <BootstrapPagination>
        {[...Array(pages).keys()].map((arr) => (
          <LinkContainer
            key={arr + 1}
            to={
              !isAdmin ? `/page/${arr + 1}` : `/admin/${adminPath}/${arr + 1}`
            }
          >
            <BootstrapPagination.Item active={arr + 1 === page}>
              {arr + 1}
            </BootstrapPagination.Item>
          </LinkContainer>
        ))}
      </BootstrapPagination>
    );
  }
};

export default Pagination;
