import { memo } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const DropDown = (props) => {
  const {
    title,
    onClick,
    path,
    pathSecond,
    pathThird,
    id,
    name,
    nameSecond,
    nameThird,
  } = props;
  return (
    <NavDropdown title={title} id={id}>
      <LinkContainer to={path}>
        <NavDropdown.Item>{name}</NavDropdown.Item>
      </LinkContainer>
      {/* in case needs more link in dropdown */}
      {pathSecond && (
        <LinkContainer to={pathSecond}>
          <NavDropdown.Item>{nameSecond}</NavDropdown.Item>
        </LinkContainer>
      )}
      {pathThird && (
        <LinkContainer to={pathThird}>
          <NavDropdown.Item>{nameThird}</NavDropdown.Item>
        </LinkContainer>
      )}

      {onClick && <NavDropdown.Item onClick={onClick}>Logout</NavDropdown.Item>}
    </NavDropdown>
  );
};

export default memo(DropDown);
