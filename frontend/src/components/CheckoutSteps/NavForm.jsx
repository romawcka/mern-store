import { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavForm = ({ step, link, title }) => {
  return (
    <Nav.Item>
      {step ? (
        <LinkContainer to={link}>
          <Nav.Link>{title}</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>{title}</Nav.Link>
      )}
    </Nav.Item>
  );
};

export default memo(NavForm);
