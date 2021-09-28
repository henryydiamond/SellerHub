import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Tinubuka | Home',
  description: 'We sell quality products for a very affordable price',
  keywords: 'All kind of products can be found on this platform',
};

export default Meta;
