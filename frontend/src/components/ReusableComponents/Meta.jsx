import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = (props) => {
  const {
    title = 'Welcome to MERN store',
    description = 'We sell the best products for cheap',
    keywords = 'electronic, buy electronics, cheap electronics',
  } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default memo(Meta);
