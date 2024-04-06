import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Pagination = (props) => {
  const { page, pages, isAdmin = false, adminPath, keyword = '' } = props;
  const keywordPath = `search/${keyword}/page/`;

  if (pages > 1) {
    return (
      <BootstrapPagination>
        {[...Array(pages).keys()].map((arr) => (
          <LinkContainer
            key={arr + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${arr + 1}`
                  : `/page/${arr + 1}`
                : `/admin/${adminPath}/${arr + 1}`
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
