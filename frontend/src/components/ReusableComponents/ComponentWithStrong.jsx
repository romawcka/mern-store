import { memo } from 'react';

const ComponentWithStrong = ({ name, value, pos }) => {
  return (
    <p>
      <strong>{name}:</strong> {value}
      {pos && (
        <>
          {pos.address}, {pos.city}, {pos.country}, {pos.postalCode}
        </>
      )}
    </p>
  );
};

export default memo(ComponentWithStrong);
