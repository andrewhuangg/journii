import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({
  title = 'journii',
  description = 'A place to express, reflect, discover, and grow.',
  keywords = 'blog, posts, articles',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta;
