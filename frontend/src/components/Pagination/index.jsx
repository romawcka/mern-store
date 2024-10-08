import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Pagination = (props) => {
  const { page, pages, isAdmin = false, adminPath, keyword = '' } = props;

  const keywordPath = `/search/${keyword}/page`;
  const admin = `/admin/${adminPath}`;

  if (pages > 1) {
    return (
      <BootstrapPagination>
        {[...Array(pages).keys()].map((arr) => (
          <LinkContainer
            key={arr + 1}
            to={
              !isAdmin
                ? keyword
                  ? `${keywordPath}/${arr + 1}`
                  : `/page/${arr + 1}`
                : `${admin}/${arr + 1}`
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
