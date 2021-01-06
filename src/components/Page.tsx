import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

type PageProps = {
  children: React.ReactNode;
  title: string;
  [x: string]: any;
};

const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
